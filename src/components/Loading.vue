<template lang="pug">
.loading-ratio.loading(:style='s', :class='c')
</template>

<script>
export default {
  name: 'Loading',
  props: ['s', 'c'],
}
</script>

<style lang="sass">
@import "@/assets/css/_function.sass"
$loader-color: #eee

.sk-folding-cube
  margin: 20px auto
  width: 40px
  height: 40px
  position: relative
  transform: rotateZ(45deg)
  .sk-cube
    float: left
    width: 50%
    height: 50%
    position: relative
    transform: scale(1.1)
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $loader-color
      animation: sk-foldCubeAngle 2.4s infinite linear both
      transform-origin: 100% 100%
  .sk-cube2
    transform: scale(1.1) rotateZ(90deg)
  .sk-cube3
    transform: scale(1.1) rotateZ(180deg)
  .sk-cube4
    transform: scale(1.1) rotateZ(270deg)
  .sk-cube2:before
    animation-delay: 0.3s
  .sk-cube3:before
    animation-delay: 0.6s
  .sk-cube4:before
    animation-delay: 0.9s

@keyframes sk-foldCubeAngle
  0%, 10%
    transform: perspective(140px) rotateX(-180deg)
    opacity: 0

  25%, 75%
    transform: perspective(140px) rotateX(0deg)
    opacity: 1

  90%, 100%
    transform: perspective(140px) rotateY(180deg)
    opacity: 0


@keyframes sk-foldCubeAngle
  0%, 10%
    transform: perspective(140px) rotateX(-180deg)
    opacity: 0

  25%, 75%
    transform: perspective(140px) rotateX(0deg)
    opacity: 1

  90%, 100%
    transform: perspective(140px) rotateY(180deg)
    opacity: 0

// 圓圈漣漪Loading
.spinner
  width: 60px
  height: 60px
  margin: 100px auto
  background-color: $loader-color
  border-radius: 100%
  animation: sk-scaleout 1.0s infinite ease-in-out

@keyframes sk-scaleout
  0%
    transform: scale(0)

  100%
    transform: scale(1)
    opacity: 0


@keyframes sk-scaleout
  0%
    transform: scale(0)
    transform: scale(0)

  100%
    transform: scale(1)
    transform: scale(1)
    opacity: 0

.loading-ratio
  width: 50px
  height: 50px
  border: 7px solid transparent
  border-top-color: $loader-color
  border-bottom-color: $loader-color
  border-radius: 50%
  position: relative
  animation: loader-rotate 1s linear infinite
  top: 50%
  margin: -28px auto 0

@keyframes loader-rotate
  0%
    transform: rotate(0)

  100%
    transform: rotate(360deg)

.cp-eclipse
  position: relative
  width: 12px
  height: 12px
  display: block
  box-sizing: border-box
  border-radius: 50%
  background: rgba($loader-color, .7)
  +mx(auto)
  animation: cp-eclipse-animate 1s ease-out infinite
  &:before
    border-radius: 50%
    content: " "
    width: 48px
    height: 48px
    display: inline-block
    box-sizing: border-box
    border-top: solid 6px transparent
    border-right: solid 6px rgba($loader-color, .9)
    border-bottom: solid 6px transparent
    border-left: solid 6px transparent
    position: absolute
    top: -18px
    left: -18px
  &:after
    border-radius: 50%
    content: " "
    width: 48px
    height: 48px
    display: inline-block
    box-sizing: border-box
    border-top: solid 6px transparent
    border-right: solid 6px transparent
    border-bottom: solid 6px transparent
    border-left: solid 6px rgba($loader-color, .9)
    position: absolute
    top: -18px
    right: -18px

@keyframes cp-eclipse-animate
  0%
    transform: rotate(35deg)
  100%
    transform: rotate(395deg)

</style>
