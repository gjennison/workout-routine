<template>
  <div id="app">
    <div class="background"></div>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column">
          <h2 class="title has-text-white">{{ countDown }}</h2>
          <h2 class="title is-size-1 has-text-white">{{ currentWorkoutList[currentWorkout][0] }}</h2>
          <h4>{{ currentWorkout + 1 }} / {{ currentWorkoutList.length }}</h4>
        </div>
        <div class="column"></div>
      </div>
    </div>

    <div class="container vidContainerContainer">
      <div class="vidContainer">
        <div class="progress"></div>
        <video
          id="centerVideo"
          :src="currentWorkoutList[currentWorkout][1]"
          type="video/mp4"
          autoplay
          loop
          muted
        ></video>
      </div>
    </div>

    <FormBox @submit="reset($event)" />
  </div>
</template>

<script>
import FormBox from "./components/FormBox.vue";

var countDownAmount = 3;

export default {
  name: "App",
  components: {
    FormBox
  },

  data() {
    return {
      countDown: countDownAmount,
      timeOut: null,
      currentWorkoutList: [
        ["pushups", "/armsAndChest/pushups.mp4"],
        ["plank walkdown", "/armsAndChest/plank walkdown.mp4"]
      ],
      currentWorkout: 0
    };
  },

  computed: {
    nextWorkout: function() {
      if (this.currentWorkout + 1 < this.currentWorkoutList.length)
        return this.currentWorkoutList[this.currentWorkout + 1][0];
      else return this.currentWorkoutList[0][0];
    }
  },

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        this.timeOut = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDown = countDownAmount;
        this.changeCurrentWorkout();
        this.countDownTimer();
      }
    },

    reset(event) {
      this.currentWorkoutList = event;
      this.currentWorkout = 0;
      clearTimeout(this.timeOut);
      this.countDown = countDownAmount;
      this.countDownTimer();

      var progress = document.getElementsByClassName("progress")[0];
      progress.style.animationDuration = this.countDown.toString() + "s";

      document
        .getElementsByClassName("vidContainer")[0]
        .replaceChild(progress, document.getElementsByClassName("progress")[0]);
    },

    changeCurrentWorkout() {
      this.currentWorkout++;
      if (this.currentWorkout >= this.currentWorkoutList.length)
        this.currentWorkout = 0;
    }
  },

  mounted() {
    this.countDownTimer();
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

@import "~bulma/css/bulma.css";

.vidContainer {
  overflow: hidden;
  width: 600px;
  height: 480px;
  margin-left: 40px;
}

.vidContainerContainer {
  display: flex;
  justify-content: center;
}

#centerVideo {
  margin-left: -40px;
  width: 640px;
  height: 480px;
  margin-right: 8px;
}

label {
  padding: 8px;
}

@media (max-width: 600px) {
  .vidContainer {
    width: 100%;
  }

  #centerVideo {
    width: 107%;
  }
}

@media (min-width: 1200px) {
  .vidContainer {
    width: 800px;
  }

  #centerVideo {
    width: 896px;
    margin-left: -90px;
  }
}

.progress {
  position: relative;
  top: 39px;
  height: 6px;
  animation: progress 3s infinite linear;
  transition: background-color 0.4s;
  width: 0%;
}

@keyframes progress {
  0% {
    width: 0%;
    background-color: blue;
  }
  60% {
    background-color: green;
  }
  80% {
    background-color: red;
  }
  93% {
    background-color: red;
  }
  100% {
    width: 94%;
  }
}
</style>
