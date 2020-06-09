<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column">
          <h2 class="title has-text-white">{{ countDown }}</h2>
          <h2 class="title is-size-1 has-text-white">{{ currentWorkoutList[currentWorkout][0] }}</h2>
          <h4>{{ currentWorkout + 1 }} / {{ currentWorkoutList.length }}</h4>
        </div>
        <div class="column">
          <!-- <h2 class="title is-size-5 has-text-white">Next workout:</h2>
          <h2 class="title is-size-4 has-text-white">{{ nextWorkout }}</h2>-->
        </div>
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
    {{currentWorkoutList}}
  </div>
</template>

<script>
var countDownAmount = 3;

import FormBox from "./FormBox.vue";

export default {
  data() {
    return {
      countDown: countDownAmount,
      amountForEach: [0, 0, 0, 0],
      selectedAmountofWorkouts: "",
      currentWorkoutList: [
        ["pushups", "/armsAndChest/pushups.mp4"],
        ["plank walkdown", "/armsAndChest/plank walkdown.mp4"]
      ],
      testWOrkout: "/armsAndChest/pushups.mp4",
      workouts: {
        armsAndChest: {
          workouts: [
            ["pushups", "/armsAndChest/pushups.mp4"],
            ["T-pushups", "/armsAndChest/t pushups.mp4"],
            ["plank walkdown", "/armsAndChest/plank walkdown.mp4"],
            ["inchworm", "/armsAndChest/inchworm.mp4"],
            ["tricep dips", "/armsAndChest/tricep dips.mp4"],
            ["military pushups", "/armsAndChest/millitary pushups.mp4"],
            ["high plank", "/armsAndChest/high plank.mp4"]
          ],
          isActive: false
        },
        back: {
          workouts: [
            ["superman", "/back/superman.mp4"],
            ["quadruped limb raises", "/back/limb raises.mp4"],
            ["y superman", "/back/y superman.mp4"],
            ["w superman", "/back/w superman.mp4"],
            ["t superman", "/back/t superman.mp4"],
            ["scapula pushups", "/back/scapula pushups.mp4"],
            ["plank kick ups", "/back/kick ups.mp4"]
          ],
          isActive: false
        },
        abs: {
          workouts: [
            ["situps", "/abs/situp.mp4"],
            ["oblique situps", "/abs/oblique situps.mp4"],
            ["v up", "/abs/v ups.mp4"],
            ["flutter kick", "/abs/flutter kicks.mp4"],
            ["side plank", "/abs/side plank.mp4"],
            ["side to side situps", "/abs/side to side sit ups.mp4"],
            ["bicycle kicks", "/abs/bicycle kicks.mp4"]
          ],
          isActive: false
        },
        legs: {
          workouts: [
            ["glute bridge", "/legs/glute bridge.mp4"],
            ["jump squat", "/legs/jump squat.mp4"],
            ["lateral lunges", "/legs/lateral lunges.mp4"],
            ["the donkey", "/legs/the donkey.mp4"],
            ["reverse lunges", "/legs/reverse lunges.mp4"]
          ],
          isActive: false
        }
      },
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
        setTimeout(() => {
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
      this.countDown = countDownAmount;
    },

    changeCurrentWorkout() {
      this.currentWorkout++;
      if (this.currentWorkout >= this.currentWorkoutList.length)
        this.currentWorkout = 0;
    },

    submitWorkout() {
      this.currentWorkout = 0;
      this.currentWorkoutList = [];
      this.countDown = countDownAmount;

      var amountOfWorkouts;
      if (this.selectedAmountofWorkouts != "") {
        amountOfWorkouts = parseInt(this.selectedAmountofWorkouts);
      } else amountOfWorkouts = 0;

      var amountForEach = [0, 0, 0, 0];
      var amountOfGroupsActive = 0;

      if (this.workouts.armsAndChest.isActive) amountOfGroupsActive++;
      if (this.workouts.back.isActive) amountOfGroupsActive++;
      if (this.workouts.abs.isActive) amountOfGroupsActive++;
      if (this.workouts.legs.isActive) amountOfGroupsActive++;

      var amountPer = Math.floor(amountOfWorkouts / amountOfGroupsActive);
      var remainder = amountOfWorkouts % amountOfGroupsActive;

      if (this.workouts.armsAndChest.isActive) {
        amountForEach[0] = amountPer;
        if (remainder > 0) amountForEach[0]++;
        remainder--;
      }
      if (this.workouts.back.isActive) {
        amountForEach[1] = amountPer;
        if (remainder > 0) amountForEach[1]++;
        remainder--;
      }
      if (this.workouts.abs.isActive) {
        amountForEach[2] = amountPer;
        if (remainder > 0) amountForEach[2]++;
        remainder--;
      }
      if (this.workouts.legs.isActive) {
        amountForEach[3] = amountPer;
        if (remainder > 0) amountForEach[3]++;
        remainder--;
      }

      console.log(amountForEach);

      if (this.workouts.armsAndChest.isActive) {
        var shuffledArray = this.shuffleArray(
          this.workouts.armsAndChest.workouts
        );

        var i;
        for (i = 0; i < amountForEach[0]; i++) {
          if (i < this.workouts.armsAndChest.workouts.length)
            this.currentWorkoutList.push(shuffledArray[i]);
          else
            this.currentWorkoutList.push(
              shuffledArray[i - this.workouts.armsAndChest.workouts.length]
            );
        }
      }

      if (this.workouts.back.isActive) {
        var shuffledArray = this.shuffleArray(this.workouts.back.workouts);

        var i;
        for (i = 0; i < amountForEach[1]; i++) {
          if (i < this.workouts.back.workouts.length)
            this.currentWorkoutList.push(shuffledArray[i]);
          else
            this.currentWorkoutList.push(
              shuffledArray[i - this.workouts.back.workouts.length]
            );
        }
      }

      if (this.workouts.abs.isActive) {
        var shuffledArray = this.shuffleArray(this.workouts.abs.workouts);

        var i;
        for (i = 0; i < amountForEach[2]; i++) {
          if (i < this.workouts.abs.workouts.length)
            this.currentWorkoutList.push(shuffledArray[i]);
          else
            this.currentWorkoutList.push(
              shuffledArray[i - this.workouts.abs.workouts.length]
            );
        }
      }
      if (this.workouts.legs.isActive) {
        var shuffledArray = this.shuffleArray(this.workouts.legs.workouts);

        var i;
        for (i = 0; i < amountForEach[3]; i++) {
          if (i < this.workouts.legs.workouts.length)
            this.currentWorkoutList.push(shuffledArray[i]);
          else
            this.currentWorkoutList.push(
              shuffledArray[i - this.workouts.legs.workouts.length]
            );
        }
      }

      this.currentWorkoutList = this.shuffleArray(this.currentWorkoutList);

      var progress = document.getElementsByClassName("progress")[0];

      document
        .getElementsByClassName("vidContainer")[0]
        .replaceChild(progress, document.getElementsByClassName("progress")[0]);
    },

    shuffleArray(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  },

  mounted() {
    this.changeCurrentWorkout();
    this.countDownTimer();
  }
};
</script>

<style scoped lang="scss">
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
  animation: progress 30s infinite linear;
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

.inputContainer {
  margin-top: 40px;
}
</style>
