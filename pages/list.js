import axios from "axios";
import React, { useEffect, useState, useMemo, createRef } from "react";
import { Dimensions, View, Text } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";
import { isEmpty, get } from "lodash";

var Buffer = require("buffer").Buffer;

import MoviesList from "../components/list/movies/movies";
import YearList from "../components/list/filter/years";
import TypeList from "../components/list/filter/type";
import Preview from "../components/list/preview";

const toBase64 = (obj) => {
  return new Buffer(JSON.stringify(obj)).toString("base64");
};
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Main = styled.View`
  width: 100%;
  height: 100%;
  background-color: #262626;
`;

const TopLayer = styled.View`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const FilterLayer = styled.View`
  flex: 1 0 30%;
  height: 100%;
  background: #262626;
`;

const PreviewLayer = styled.View`
  flex: 1 0 70%;
  background-color: #202020;
  height: 100%;
`;

const BotLayer = styled.View`
  min-width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListScreen = ({ navigation }) => {
  const [store, setStore] = useState({});
  const [sourceStore, setSourceStore] = useState({});
  const [focusing, setFocusing] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState("全部");
  const [year, setYear] = useState("全部");

  useEffect(() => {
    setTimeout(() => {
      fetchMovies();
      setPreview(null);
    }, 500);
  }, [type, year]);

  const fetchId = useMemo(() => {
    return toBase64({
      type,
      year,
    });
  }, [type, year]);

  const movies = useMemo(() => {
    return get(store, `${fetchId}.items`, []);
  }, [store]);

  useEffect(() => {
    if (focusing.type === "movie" && focusing.movie) {
      setPreview(focusing.movie);
    }

    if (focusing.type === "movie" && focusing.index % 50 === 45) {
      fetchMovies();
    }
  }, [focusing]);

  const updateStore = (data) => {
    setStore((_store) => ({
      ..._store,
      [fetchId]: {
        currentPage: data.currentPage,
        hasNextPage: data.hasNextPage,
        items: [...get(_store, `${fetchId}.items`, []), ...(data.items || [])],
      },
    }));
    data.items.forEach((item) => {
      const { source, sources, trailer } = item;
      if (sources && trailer !== undefined) {
        setSourceStore((_store) => ({
          ..._store,
          [source]: {
            sources,
            trailer,
          },
        }));
      }
    });
  };

  const fetchMovies = () => {
    let page = 1;
    if (get(store, fetchId)) {
      if (get(store, `${fetchId}.hasNextPage`)) {
        page = get(store, `${fetchId}.currentPage`) + 1;
      } else {
        page = -1;
      }
    }
    if (!loading && page > 0) {
      if (page < 2) {
        setLoading(true);
      }
      const _type = type === "全部" ? "" : type;
      const _year = year === "全部" ? "" : year;
      const url = `http://128.199.246.210:9999/cron/movies?type=${_type}&year=${_year}&page=${page}`;
      console.log("Plan to fetch: ", url);
      axios
        .get(url)
        .then(({ data }) => {
          if (!isEmpty(data)) {
            updateStore(data);
            setLoading(false);
          }
          console.log("fetched!!", { _type, _year, page });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err, "fetctMovies Error:", url);
          setLoading(false);
        });
    }
  };

  const toPlayer = (movie) => {
    navigation.navigate("Player", { movie });
  };

  return (
    <Main>
      <TopLayer>
        <FilterLayer>
          <YearList
            year={year}
            setYear={setYear}
            focusing={focusing}
            setFocusing={setFocusing}
          />
          <TypeList
            type={type}
            setType={setType}
            focusing={focusing}
            setFocusing={setFocusing}
          />
        </FilterLayer>
        <PreviewLayer>
          <Preview
            sourceStore={sourceStore}
            setSourceStore={setSourceStore}
            preview={preview}
            focusing={focusing}
            setFocusing={setFocusing}
          />
        </PreviewLayer>
      </TopLayer>
      <BotLayer
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingRight: wp("2%"), paddingLeft: wp("2%") }}
      >
        {/* <Text>{JSON.stringify(movies)}</Text> */}
        {loading ? (
          <ActivityIndicator animating={true} color="#c4c4c4" />
        ) : (
          <MoviesList
            movies={movies}
            focusing={focusing}
            setFocusing={setFocusing}
            toPlayer={toPlayer}
          />
        )}
      </BotLayer>
      {/* <Button mode="outlined" onPress={() => fetchMovies()}>
        片源
      </Button>
      <Text>{JSON.stringify(movies)}</Text> */}
    </Main>
  );
};

export default ListScreen;

const ff = () => {
  return {
    totalItems: 653,
    totalPage: 14,
    currentPage: 12,
    hasNextPage: true,
    items: [
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/10/p2624921445-185x278.jpeg",
        date: "2020/10/28",
        year: "2020",
        title: "超能少女",
        source: "161635",
        tags: ["劇情片"],
      },
      {
        title: "超能西蒙的奇幻旅程",
        date: "2020/02/05",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/fIqAzECiZtjaaM2qC5uGPKVBbdQ-185x278.jpg",
        source: "simons-got-a-gift",
        tags: ["家庭片", "愛情片", "科幻片"],
        year: "2020",
      },
      {
        year: "2020",
        title: "超能計畫",
        date: "2020/08/14",
        source: "project-power",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/8WzCUUubdKtOlNw4WBV5gsdopw7-185x278.jpg",
        tags: ["動作片", "熱門電影", "犯罪片", "科幻片"],
      },
      {
        year: "2020",
        title: "超能追緝",
        tags: ["冒險片", "動作片", "奇幻片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/lHdjMUZWYFJRcqJ5T3eNWWcoeUf-185x278.jpg",
        date: "2020/02/28",
        source: "mortal",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/11/p2626901294-185x278.jpeg",
        source: "34938156",
        date: "2020/11/29",
        year: "2020",
        title: "趙子龍",
        tags: ["動作片", "古裝", "歷史片"],
      },
      {
        source: "zhao-yuns-fight-at-changban",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/11/40qIShf783bkgyMqBIlSUdJDUfO-185x278.jpg",
        year: "2020",
        tags: ["戰爭片", "歷史片"],
        date: "2020/11/06",
        title: "趙雲傳之龍鳴長坂坡",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/08/hgeXCLiRNd26fkoxBmjyroTtunc-185x278.jpg",
        date: "2020/08/20",
        source: "behind-the-line-escape-to-dunkirk",
        title: "身陷敵後：奔向敦刻爾克",
        tags: ["戰爭片"],
        year: "2020",
      },
      {
        year: "2020",
        date: "2020/01/16",
        title: "追龍番外篇：十億探長",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/01/Chasing-the-Dragon.jpg",
        tags: ["劇情片", "犯罪片"],
        source: "chasing-the-dragon2020",
      },
      {
        date: "2020/12/31",
        year: "2020",
        tags: ["劇情片", "家庭片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/01/A-Little-Red-Flower-185x278.jpg",
        title: "送你一朵小紅花",
        source: "a-little-red-flower",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/02/j3xfnQxc99gdmlCtWl07HkVvy0K-185x278.jpg",
        year: "2020",
        date: "2020/02/14",
        title: "逐夢拍檔",
        source: "isi-ossi",
        tags: ["喜劇片", "愛情片"],
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/04/qr19ZmD8hQnxtP3wDW8n9qUiOmL-185x278.jpg",
        source: "inside-the-rain",
        tags: ["劇情片", "喜劇片", "愛情片"],
        date: "2020/03/13",
        title: "逐夢雨人",
        year: "2020",
      },
      {
        tags: ["動畫片", "家庭片"],
        source: "the-larva-island-movie",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/07/uHdxICUIRGoJjK67aOp3ykvL8ZW-185x278.jpg",
        date: "2020/07/23",
        title: "逗逗蟲：荒島生存記",
        year: "2020",
      },
      {
        tags: ["冒險片", "動作片", "動畫片", "奇幻片"],
        date: "2020/07/17",
        title: "進擊的巨人：編年史",
        source: "attack-on-titan-chronicle",
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/07/10mGHIWt8TkMvnmSlqCChzigwFl-185x278.jpg",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/8f8JgF2XILfTDNSk0zuBSqdaLPk-185x278.jpg",
        date: "2020/10/02",
        title: "選票騙很大",
        source: "berliner",
        tags: ["劇情片", "喜劇片"],
        year: "2020",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/06/c7CTxNNPeg6MH9VA9BBvMKdPmSh-185x278.jpg",
        title: "遺忘之聲",
        year: "2020",
        date: "2020/04/15",
        source: "nobody-knows-im-here",
        tags: ["劇情片", "音樂片"],
      },
      {
        year: "2020",
        title: "邀請函",
        date: "2020/04/22",
        tags: ["劇情片", "愛情片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/09/8aeItpTWUUQmVyqkvFwYV1XwGLO-185x278.jpg",
        source: "invitation",
      },
      {
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/01/aLyRtGJWH4AHe5DZxtneTLIwtls-185x278.jpg",
        tags: ["劇情片"],
        date: "2020/12/25",
        source: "one-night-in-miami",
        title: "邁阿密的一夜",
      },
      {
        source: "next-door-neighbor",
        date: "2020/11/25",
        tags: ["劇情片", "懸疑片", "犯罪片"],
        title: "鄰居2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/kxpDRY5qVP2JSP98Xqi2WKPWjm3-185x278.jpg",
        year: "2020",
      },
      {
        year: "2020",
        date: "2020/09/24",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/09/Druk-185x278.jpg",
        tags: ["劇情片", "喜劇片"],
        source: "another-round",
        title: "酒精計劃",
      },
      {
        date: "2020/03/27",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/03/neUgCuBhafxYQyXTKxwjQejqqa7-185x278.jpg",
        title: "醇美人生",
        year: "2020",
        tags: ["劇情片"],
        source: "uncorked",
      },
      {
        tags: ["動作片", "戰爭片"],
        date: "2020/08/20",
        title: "重裝救援：全境獵殺",
        year: "2020",
        source: "rogue",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/08/Rogue-185x278.jpg",
      },
      {
        tags: ["劇情片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/q3nq8uNRhL6DJSCAkJDx48aOvSO-185x278.jpg",
        title: "野雀之詩",
        date: "2020/07/24",
        source: "wild-sparrow",
        year: "2020",
      },
      {
        date: "2020/10/23",
        poster:
          "https://image.tmdb.org/t/p/w185/5cRjcfNKcitGYTFFWWCFeJNzU15.jpg",
        tags: ["動作片", "戰爭片"],
        title: "金剛川",
        year: "2020",
        source: "sacrifice",
      },
      {
        year: "2020",
        source: "assassins",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/5qLfbnXSYEEscSSE3eHFIppYGZn-185x278.jpg",
        date: "2020/01/26",
        tags: ["紀錄片"],
        title: "金氏殺機",
      },
      {
        tags: ["劇情片", "愛情片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/mSTrRgXGzu2t1jVhTexIqwSHlk7-185x278.jpg",
        source: "the-nest",
        title: "金窩駭浪",
        date: "2020/05/08",
        year: "2020",
      },
      {
        year: "2020",
        title: "銀河守門員",
        date: "2020/08/27",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/1AkgB1GoseuOB0i14uC185oqmCz-185x278.jpg",
        source: "cosmoball",
        tags: ["冒險片", "奇幻片", "科幻片"],
      },
      {
        year: "2020",
        source: "199372",
        title: "銀色溜冰鞋",
        date: "2020/12/10",
        tags: ["冒險片", "劇情片", "家庭片", "愛情片", "歷史片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/12/The-Silver-Skates2021-185x278.jpeg",
      },
      {
        date: "2020/03/06",
        tags: ["劇情片"],
        year: "2020",
        source: "the-banker",
        title: "銀行家",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/03/2K8Lbz0Rtl7HjbojQlrEGg6Fy4y-185x278.jpg",
      },
      {
        date: "2020/01/27",
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/02/34961645.jpg",
        title: "錦毛鼠之涅槃重生",
        tags: ["冒險片", "動作片", "奇幻片"],
        source: "34961645",
      },
      {
        date: "2020/10/06",
        tags: ["冒險片", "劇情片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/10/p2621563798-185x278.jpeg",
        source: "35212160",
        title: "鎖龍井",
        year: "2020",
      },
      {
        tags: ["動作片", "古裝", "喜劇片"],
        source: "35132818",
        title: "鎮魂歌",
        date: "2020/07/26",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/07/p2613241567-185x278.jpeg",
        year: "2020",
      },
      {
        tags: ["冒險片", "動作片", "科幻片"],
        date: "2020/07/03",
        year: "2020",
        title: "鐵甲狂猴2決戰黎明",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/zd0630LEnaCWHHhgnExz71q1QNF-185x278.jpg",
        source: "the-outlaw-thunder-2-battle-dawn",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/hC1n9tzLzIxcXCacDRn9o3cAQW4-185x278.jpg",
        date: "2020/06/18",
        source: "the-outlaw-thunder",
        year: "2020",
        tags: ["冒險片", "動作片", "科幻片"],
        title: "鐵甲狂猴之亡命雷霆",
      },
      {
        title: "長燈歌",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/02/30463454.jpg",
        tags: ["古裝", "愛情片"],
        date: "2020/02/12",
        year: "2020",
        source: "30463454",
      },
      {
        title: "門神之決戰蛟龍",
        date: "2020/12/20",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/12/orU5XuCDjrd2W1u5P21foaX4G0-185x278.jpg",
        year: "2020",
        tags: ["劇情片", "動作片"],
        source: "heavens-will-descend-the-dragon",
      },
      {
        source: "wife-of-a-spy",
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/03/wife-of-a-spy-185x278.jpg",
        title: "間諜之妻",
        tags: ["劇情片", "戰爭片", "歷史片"],
        date: "2020/10/16",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/02/UsWENHqyQbY1yWZu51DSv7q88n-185x278.jpg",
        year: "2020",
        source: "spy-intervention",
        date: "2020/02/14",
        title: "間諜干涉",
        tags: ["冒險片", "動作片", "喜劇片"],
      },
      {
        tags: ["動作片", "喜劇片", "熱門電影"],
        source: "my-spy",
        year: "2020",
        title: "間諜速成班",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/rrfeMyxfY2uoUxLKAQ8eFihfBRN-185x278.jpg",
        date: "2020/01/09",
      },
      {
        year: "2020",
        date: "2020/03/02",
        source: "holly-slept-over",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/03/u6vw5DqEvcCMreliZxLamykmWKm-185x278.jpg",
        title: "閨蜜三人行",
        tags: ["喜劇片"],
      },
      {
        year: "2020",
        date: "2020/08/27",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/Dw9Ot4Lp1hnTwCpycdOxzXYtDi-185x278.jpg",
        tags: ["劇情片", "喜劇片", "家庭片"],
        title: "阿公當家",
        source: "the-war-with-grandpa",
      },
      {
        tags: ["傳記片", "劇情片", "懸疑片"],
        source: "agatha-and-the-midnight-murders",
        title: "阿加莎與午夜謀殺案",
        date: "2020/10/07",
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/12/yAelUtcdiehTELYmX8UBFStTTZt-185x278.jpg",
      },
      {
        source: "bill-ted-face-the-music",
        year: "2020",
        tags: ["冒險片", "喜劇片", "熱門電影", "科幻片", "音樂片"],
        title: "阿比阿弟尋歌大冒險",
        date: "2020/08/27",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/hm9lKJzYCBYXoD34BpU15ybwHta-185x278.jpg",
      },
      {
        tags: ["冒險片", "奇幻片", "家庭片", "迪士尼"],
        source: "artemis-fowl",
        title: "阿特米斯的奇幻歷險",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/06/ij1ZfANM3EJm6HHS0ZXycX5f74i-185x278.jpg",
        date: "2020/06/12",
        year: "2020",
      },
      {
        year: "2020",
        tags: ["古裝", "奇幻片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/05/1588254348.jpg",
        date: "2020/04/30",
        source: "35026126",
        title: "降龍大師之捉妖榜",
      },
      {
        source: "30419907",
        title: "降龍大師：獵龍隊",
        date: "2020/09/11",
        tags: ["劇情片", "動作片", "古裝"],
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/09/p2619912444-185x278.jpeg",
      },
      {
        title: "降龍大師：魔龍咒",
        tags: ["古裝", "奇幻片"],
        source: "34990001",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/03/34990001.jpg",
        date: "2020/03/13",
        year: "2020",
      },
      {
        poster:
          "https://www.movieffm.net/wp-content/uploads/2021/04/iXNhAhXA0r2SKXucmhOKew44ZKN-185x278.jpg",
        date: "2020/11/27",
        tags: ["劇情片", "動作片", "熱門電影", "犯罪片"],
        source: "caught-in-time",
        year: "2020",
        title: "除暴",
      },
      {
        date: "2020/11/29",
        year: "2020",
        title: "陰陽美人棺",
        tags: ["動作片", "奇幻片"],
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/11/gTTLx5Ghk2PPsbyn3uHZfB6TxMd-185x278.jpg",
        source: "yin-yang-beauty-coffin",
      },
      {
        title: "陳情令之亂魄",
        year: "2020",
        source: "the-untamed-fatal-journey",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/03/y1FStxEKtXvFz3oAyGVPVghj4yI-185x278.jpg",
        tags: ["古裝", "奇幻片"],
        date: "2020/03/26",
      },
      {
        title: "陳真之拳鎮山河",
        tags: ["動作片"],
        source: "35126089",
        date: "2020/07/14",
        year: "2020",
        poster:
          "https://www.movieffm.net/wp-content/uploads/2020/07/p2612063134-185x278.jpeg",
      },
    ],
  };
};
