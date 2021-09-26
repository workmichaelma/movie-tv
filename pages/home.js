import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, Modal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { findKey, isArray, isEmpty, get, map } from "lodash";
// import { useIsFocused } from "@react-navigation/native";
import base64 from "react-native-base64";
import MovieList from "../components/home/movie-list";
import Filter from "../components/home/filter";
import Pager from "../components/home/pager";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const country = {
  all: "全部",
  hk: "香港",
  kr: "韓國",
  os: "海外",
  tl: "泰國",
  ea: "歐美",
  jp: "日本",
  ch: "大陸",
  tw: "台灣",
  in: "印度",
};

const toBase64 = (obj) => {
  return base64.encode(JSON.stringify(obj));
};

const toObj = (str) => {
  return JSON.parse(base64.decode(str));
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    position: "relative",
    backgroundColor: "black",
    flex: 1,
    flexDirection: "row",
    height,
  },
  leftCol: {
    height,
    width: wp("20%"),
    position: "relative",
    backgroundColor: "#303846",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  filter: {
    flex: 1,
  },
  scrollview: {
    width: wp("80%"),
    position: "relative",
    flex: 1,
  },
});
const HomeScreen = ({ navigation }) => {
  const [store, setStore] = useState([]);
  const [focusing, setFocusing] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    orderBy: "view",
    pickByCountry: "全部",
  });
  // const isFocused = useIsFocused();

  const movies = useMemo(() => {
    const id = toBase64({
      filter: {
        ...filter,
        pickByCountry: findKey(country, (c) => c === filter.pickByCountry),
      },
      page,
    });

    return get(store, id, []);
  }, [store, filter, page]);
  useEffect(() => {
    setPage(1);
    fetchMovies({ page: 1 });
  }, [filter]);
  useEffect(() => {
    reset();
    fetchPage(1);
  }, []);

  const fetchMovies = ({ page }) => {
    if (page && !loading) {
      // setLoading(true);
      // updateStore({ data: [mmm[page - 1]], page });
      // setLoading(false);
      const fetchId = toBase64({
        filter: {
          ...filter,
          pickByCountry: findKey(country, (c) => c === filter.pickByCountry),
        },
        page,
      });

      const record = get(store, fetchId, []);

      if (isEmpty(record)) {
        setLoading(true);
        const region =
          filter.pickByCountry === "全部" ? "" : filter.pickByCountry;
        const orderBy = filter.orderBy;
        axios
          .get(
            `https://uzstrnzup5.execute-api.ap-east-1.amazonaws.com/prod/movies?page=${page}&region=${region}&orderBy=${orderBy}`
          )
          .then(({ data }) => {
            if (isArray(data) && !isEmpty(data)) {
              setStore({
                ...store,
                [fetchId]: data,
              });
              setLoading(false);
              // setFocusing(0);
            }
          })
          .catch((err) => {
            console.log(err, "fetctMovies Error");
            setLoading(false);
          });
      }
    }
  };

  const fetchPage = (page) => {
    setPage(page);
    fetchMovies({ page });
  };

  const toPlayer = (movie) => {
    navigation.navigate("Player", { movie });
  };

  const reset = () => {
    setStore([]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <Filter
          focusing={focusing}
          setFocusing={setFocusing}
          country={country}
          filter={filter}
          setFilter={setFilter}
          style={styles.filter}
        />
        <Pager
          page={page}
          setFocusing={setFocusing}
          focusing={focusing}
          fetchPage={fetchPage}
        />
      </View>
      <View style={styles.scrollview}>
        <ScrollView opacity={loading ? 0 : 1}>
          <View>
            <MovieList
              movies={movies}
              toPlayer={toPlayer}
              focusing={focusing}
              setFocusing={setFocusing}
              fetchMovies={fetchMovies}
            />
          </View>
        </ScrollView>
        {loading && (
          <Modal visible={loading}>
            <ActivityIndicator size="large" />
          </Modal>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const mmm = [
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/STAND-BY-ME-Doraemon-2-185x278.jpg",
    source: "stand-by-me-doraemon-2",
    title: "STAND BY ME 哆啦A夢2",
    date: "2020",
    tags: ["劇情片", "動畫片", "哆啦A夢", "熱門電影"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/crLhxl5jpJIsJKAqyplWlw9pe1e-185x278.jpg",
    source: "signal-the-movie",
    title: "信號 長期未解決事件搜查組 劇場版",
    date: "2021",
    tags: ["懸疑片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/rgvU6JQEu5Zj17re4hUtsBEs9Yp-185x278.jpg",
    source: "yowamushi-pedal-up-the-road",
    title: "飆速宅男",
    date: "2020",
    tags: ["劇情片", "喜劇片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/03/Audmh3v2o8Tzni8zTEyqUqiGfKD-185x278.jpg",
    source: "child-of-the-stars",
    title: "星之子",
    date: "2020",
    tags: ["劇情片", "家庭片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/03/tpYB882Auqv962JHEtJ1x19otYU-185x278.jpg",
    source: "appointment-with-death",
    title: "與死亡約會",
    date: "2021",
    tags: ["劇情片", "懸疑片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/03/wife-of-a-spy-185x278.jpg",
    source: "wife-of-a-spy",
    title: "間諜之妻",
    date: "2020",
    tags: ["劇情片", "戰爭片", "歷史片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/tM7R0W4ASvnF8T6IwJDl9ueW4hh-185x278.jpg",
    source: "detective-conan-the-scarlet-alibi",
    title: "名偵探柯南：緋色的不在場證明",
    date: "2021",
    tags: ["劇情片", "動作片", "動畫片", "名偵探柯南", "懸疑片", "熱門電影"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/4iAniUoEzO8eejgGd9p4iiYHqsL-185x278.jpg",
    source: "letranger-de-la-plage",
    title: "海邊的異邦人",
    date: "2020",
    tags: ["劇情片", "動畫片", "愛情片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/ug2qQSoZb6hq401BN5lcAbnPbZm-185x278.jpg",
    source: "tezukas-barbara",
    title: "手塚治虫迷幻少女",
    date: "2020",
    tags: ["奇幻片", "懸疑片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/02/137165137165-185x278.jpg",
    source: "137165",
    title: "鬼滅之刃那田蜘蛛山篇",
    date: "2020",
    tags: ["劇情片", "動作片", "奇幻片", "熱門電影"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/02/nziMLIlOxoMIvShMOTXczBwoxVd-185x278.jpg",
    source: "our-story",
    title: "小說之神",
    date: "2020",
    tags: ["劇情片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/02/HumanLost-185x278.jpg",
    source: "human-lost",
    title: "人間失格",
    date: "2019",
    tags: ["動畫片", "科幻片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/sWLv73StD1GaC4im7mcWCq33GiM-185x278.jpg",
    source: "crayon-shinchan-2020-theatrical-film",
    title: "蠟筆小新：激戰！塗鴉王國與差不多四勇者",
    date: "2020",
    tags: ["動畫片", "熱門電影"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/rMUDmntckRcONFQ26pq3knsj06v-185x278.jpg",
    source: "ito",
    title: "線2020",
    date: "2020",
    tags: ["愛情片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/02/vd8IC1wx0RL3mHliUYnMNsK9GlM-185x278.jpg",
    source: "blue-painful-and-brittle",
    title: "青澀的傷痛與脆弱",
    date: "2020",
    tags: ["冒險片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/01/o0e2a67URXrFPxLa6eTdn2aLCIa-185x278.jpg",
    source: "kiss-him-not-me",
    title: "我太受歡迎了該怎麼辦真人版",
    date: "2020",
    tags: ["喜劇片", "愛情片"],
  },
  {
    poster:
      "https://www.movieffm.net/wp-content/uploads/2021/04/t4qu7jZpdBVrNqvgsUR6pDRYLbT-185x278.jpg",
    source: "from-today-its-my-turn-the-movie",
    title: "我是大哥大！！劇場版",
    date: "2020",
    tags: ["劇情片", "喜劇片", "熱門電影"],
  },
];
