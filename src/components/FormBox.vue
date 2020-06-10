<template>
  <div id="#app" class="inputContainer">
    <input type="checkbox" id="armsAndChest" v-model="isActive[0]" />
    <label for="armsAndChest">Arms and Chest</label>
    <input type="checkbox" id="back" v-model="isActive[1]" />
    <label for="back">Back</label>

    <input type="checkbox" id="abs" v-model="isActive[2]" />
    <label for="abs">Abs</label>
    <input type="checkbox" id="legs" v-model="isActive[3]" />
    <label for="legs">Legs</label>

    <br />
    <br />

    <input
      type="text"
      placeholder="type amount of workouts"
      v-model="amountOfWorkouts"
      @keyup.enter="$emit('submit', submitWorkout())"
    />

    <br />
    <br />

    <button
      class="button has-text-black is-primary"
      type="button"
      @click="$emit('submit', submitWorkout())"
    >Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountOfWorkouts: "",
      isActive: [false, false, false, false],
      amountForEach: [0, 0, 0, 0],
      workoutList: [],
      workouts: [
        [
          ["pushups", "/armsAndChest/pushups.mp4"],
          ["T-pushups", "/armsAndChest/t pushups.mp4"],
          ["plank walkdown", "/armsAndChest/plank walkdown.mp4"],
          ["inchworm", "/armsAndChest/inchworm.mp4"],
          ["tricep dips", "/armsAndChest/tricep dips.mp4"],
          ["military pushups", "/armsAndChest/millitary pushups.mp4"],
          ["high plank", "/armsAndChest/high plank.mp4"]
        ],
        [
          ["superman", "/back/superman.mp4"],
          ["quadruped limb raises", "/back/limb raises.mp4"],
          ["y superman", "/back/y superman.mp4"],
          ["w superman", "/back/w superman.mp4"],
          ["t superman", "/back/t superman.mp4"],
          ["scapula pushups", "/back/scapula pushups.mp4"],
          ["plank kick ups", "/back/kick ups.mp4"]
        ],
        [
          ["situps", "/abs/situp.mp4"],
          ["oblique situps", "/abs/oblique situps.mp4"],
          ["v up", "/abs/v ups.mp4"],
          ["flutter kick", "/abs/flutter kicks.mp4"],
          ["side plank", "/abs/side plank.mp4"],
          ["side to side situps", "/abs/side to side sit ups.mp4"],
          ["bicycle kicks", "/abs/bicycle kicks.mp4"]
        ],
        [
          ["glute bridge", "/legs/glute bridge.mp4"],
          ["jump squat", "/legs/jump squat.mp4"],
          ["lateral lunges", "/legs/lateral lunges.mp4"],
          ["the donkey", "/legs/the donkey.mp4"],
          ["reverse lunges", "/legs/reverse lunges.mp4"]
        ]
      ]
    };
  },

  methods: {
    submitWorkout() {
      this.workoutList = [];

      var amtOfActiveGroups = 0;
      var i;
      for (i = 0; i <= 3; i++) {
        if (this.isActive[i]) amtOfActiveGroups++;
      }

      var amountOfWorkouts = parseInt(this.amountOfWorkouts);

      var amountPer = Math.floor(amountOfWorkouts / amtOfActiveGroups);

      var remainder = amountOfWorkouts % amtOfActiveGroups;

      var n;
      for (n = 0; n <= 3; n++) {
        if (this.isActive[n]) {
          this.amountForEach[n] = amountPer;

          if (remainder > 0) {
            this.amountForEach[n]++;
            remainder--;
          }
        }
      }

      this.shuffleWorkoutList();
      var x;
      for (x = 0; x <= 3; x++) {
        if (this.isActive[x]) {
          var y;
          for (y = 0; y < this.amountForEach[x]; y++) {
            this.workoutList.push(this.workouts[x][y]);
          }
        }
      }

      this.workoutList = this.shuffleArray(this.workoutList);
      console.log(this.workoutList);

      return this.workoutList;
    },
    shuffleWorkoutList() {
      var i;
      for (i = 0; i <= 3; i++) {
        this.workouts[i] = this.shuffleArray(this.workouts[i]);
      }
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
  }
};
</script>

<style lang="sass" scoped>
.inputContainer
  margin-top: 20px
</style>