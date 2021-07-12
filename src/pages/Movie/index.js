import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {IcSearch} from '../../assets';
import Modal from 'react-native-modal';
import {Gap} from '../../components/';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Movie = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData([]);
    setLimit(5);
    // wait(2000).then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    getData();
  }, []);

  const getData = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      await Axios.get(`https://www.omdbapi.com/?apikey=715289b&s=Batman&page=3`)
        .then(res => {
          // console.log('Hasil Movie Bro : ', res.data);
          const movies = res.data.Search;
          // console.log('Panjang Pilem : ', movies.length);
          if (movies.length > 0) {
            // setLimit(limit + 5);
            // alert();
            setData(movies);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('Hasil Error Bro : ', err);
        });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="white" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ListMovies = ({navigation, item}) => {
    // console.log('Hasilnya : ', item.Poster);
    return (
      <View style={styles.flatlist}>
        <Text style={styles.titleMovies}>{item.Title}</Text>
        <Text style={{color: 'white'}}>{item.Year}</Text>
        <Gap height={10} />
        <Image
          source={{uri: item.Poster}}
          style={{height: 300, width: 300, resizeMode: 'stretch'}}
        />
        <Gap height={30} />
      </View>
    );
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Popular Marvel Movies</Text>
        <TouchableOpacity>
          <IcSearch />
        </TouchableOpacity>
      </View>

      <View style={styles.containerMovies}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 80}}
          extraData={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={getData}
          onEndReachedThreshold={0}
          ListFooterComponent={renderFooter}
          data={data.slice(0, 5)}
          renderItem={({item}) => {
            return <ListMovies navigation={navigation} item={item} />;
          }}
          keyExtractor={(item, index) => String(index)}
        />
        {/* {data.map((item, i) => (
          <ListMovies navigation={navigation} key={i} item={item} />
        ))} */}
      </View>
      <Gap height={80} />
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  containerMovies: {
    paddingHorizontal: 20,
  },
  flatlist: {
    justifyContent: 'space-between',
  },
  titleMovies: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});
