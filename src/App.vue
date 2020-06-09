<template>
  <div id="app">
    <div class="background"></div>
    <Timer />
  </div>
</template>

<script>
import Timer from "./components/Timer.vue";
import FormBox from "./components/FormBox.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    Timer
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  color: white;
}

.background {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(4, 41, 48);
}
</style>
