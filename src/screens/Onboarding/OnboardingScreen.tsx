import React, { Ref, RefObject } from 'react'
import { SafeAreaView, Image, StyleSheet, FlatList, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const { width, height } = Dimensions.get('window')

const COLORS = { primary: '#fff', white: '#000' }

const slides = [
  {
    id: '1',
    image: require('../../images/on1.png'),
    title: 'My Pets',
    subtitle: 'Set up an individual profile and\ntrack the growth and health of\neach of your little guys.',
  },
  {
    id: '2',
    image: require('../../images/on2.png'),
    title: 'Appointment',
    subtitle: 'Keep your pets healthy and\nhappy by defining appointments\nand scheduling cares for them.',
  },
  {
    id: '3',
    image: require('../../images/on3.png'),
    title: 'Community',
    subtitle: 'Capture and share every joyful\nmoment with your pets. And with\nother pet owners as well.',
  },
]

const Slide = ({ item }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={item?.image} style={{ maxHeight: '70%', width, resizeMode: 'contain' }} />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  )
}

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const ref = React.useRef<any>(null)
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      ref?.current.scrollToOffset({ offset })

      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('LandingScreen')}>
                <Text style={{ color: '#DB3169', fontWeight: 'bold', fontSize: 15 }}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#DB3169',
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#DB3169',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    padding: 10,
                  },
                ]}
              >
                <FontAwesome6 name="arrow-right" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.6 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 15,
    marginTop: 10,
    // maxWidth: "80%",
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 33,
    // maxWidth: "80%",
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    height: null,
    width: '70%',
    resizeMode: 'cover',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#DB3169',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default OnboardingScreen
