import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import Animated, { interpolate, interpolateColor, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const CONTENT = [
  {
    title: 'OpenAI',
    bg: '#D7FFD4',
    fontColor: '#F655FF'
  },
  {
    title: 'OLLama',
    bg: '#29271D',
    fontColor: '#E5EDFF'
  },
  {
    title: 'Perplexity',
    bg: '#172E15',
    fontColor: '#F655FF'
  },
  {
    title: 'Gemini',
    bg: '#29271D',
    fontColor: '#E5EDFF'
  }
]

export default function AnimatedIntro() {
  const { width } = useWindowDimensions()

  const ballWidth = 40

  const half = width / 2 - ballWidth / 2

  const currentX = useSharedValue(half)

  const currentIndex = useSharedValue(0)

  const isAtStart = useSharedValue(true)

  const labelWidth = useSharedValue(0)

  const canGoToNext = useSharedValue(false)

  const didPlay = useSharedValue(false)

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % CONTENT.length
    }

    return currentIndex.value
  }, [currentIndex])

  const text = useDerivedValue(() => {
    const index = currentIndex.value

    return CONTENT[index].title
  }, [currentIndex])

  //  styles
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [CONTENT[newColorIndex.value].fontColor, CONTENT[currentIndex.value].fontColor],
        'RGB'
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          )
        }
      ]
    }
  }, [currentIndex, currentX])

  const animatedBallStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [CONTENT[newColorIndex.value].fontColor, CONTENT[currentIndex.value].fontColor],
        'RGB'
      ),
      transform: [{ translateX: currentX.value }]
    }
  })

  const animatedMaskStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [CONTENT[newColorIndex.value].bg, CONTENT[currentIndex.value].bg],
      'RGB'
    ),
    transform: [{ translateX: currentX.value }],
    width,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20

  }), [currentIndex, currentX, labelWidth])

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [CONTENT[newColorIndex.value].bg, CONTENT[currentIndex.value].bg],
      'RGB'
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(1, [1, 0], [0, -width * 2, -width, -width, -width, -width, -width])
      }
    ]
  }))
  //  end styles

  //  start animations
  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      currentX.value = withDelay(
        1000,
        withTiming(
          half + newWidth / 2,
          { duration: 800 },
          (finished) => {
            if (finished === true) {
              canGoToNext.value = true
              isAtStart.value = false
            }
          }
        )
      )
    },
    [labelWidth, currentX, half]
  )

  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            { duration: 500 },
            (finished) => {
              if (finished === true) {
                currentIndex.value = (currentIndex.value + 1) % CONTENT.length
                isAtStart.value = true
                didPlay.value = false
              }
            }
          )
        )
      }
    },
    [currentX, labelWidth]
  )
  //  end animations

  return (
    <Animated.View style={[styles.wrapper, animatedWrapperStyle]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, animatedBallStyle]} />
        <Animated.View style={[styles.mask, animatedMaskStyle]} />
        <ReText
          onLayout={(e) => { labelWidth.value = e.nativeEvent.layout.width + 4 }}
          style={[styles.title, animatedTextStyle]}
          text={text}
        />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    left: '0%',
    height: 47
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'absolute',
    left: '0%'
  },
  titleText: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    left: '0%',
    position: 'absolute'
  },
  content: {
    marginTop: 300
  }
})
