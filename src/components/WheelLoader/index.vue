<script setup lang="ts">
export type LoaderProps = {
  width?: string,
  height?: string,
  speed?: string,
  color?: string,
}

withDefaults(defineProps<LoaderProps>(), {
  width: '21px',
  height: '21px',
  speed: '1.5s',
  color: '#01ABAA',
})
</script>

<template>
  <div class="loader-wrapper relative">
    <div v-for="i in 8" :key="i" class="spoke absolute" />
  </div>
</template>

<style scoped lang="scss">
.loader-wrapper {
  width: v-bind(width);
  height: v-bind(height);

  .spoke {
    width: 10%;
    height: 30%;
    border-radius: 20px;
    background: v-bind(color);
  }

  :nth-child(1) {
    left: 50%;
    top: -5%;
    animation: colorchange-8 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(2) {
    top: 5%;
    left: 75%;
    transform: rotate(45deg);
    animation: colorchange-7 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(3) {
    top: 30%;
    left: 85%;
    transform: rotate(90deg);
    animation: colorchange-6 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(4) {
    top: 55%;
    left: 75%;
    transform: rotate(-45deg);
    animation: colorchange-5 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(5) {
    top: 65%;
    left: 50%;
    animation: colorchange-4 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(6) {
    top: 55%;
    left: 25%;
    transform: rotate(45deg);
    animation: colorchange-3 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(7) {
    top: 30%;
    left: 15%;
    transform: rotate(90deg);
    animation: colorchange-2 v-bind(speed);
    animation-iteration-count: infinite;
  }
  :nth-child(8) {
    top: 5%;
    left: 25%;
    transform: rotate(-45deg);
    animation: colorchange-1 v-bind(speed);
    animation-iteration-count: infinite;
  }
}

/* Animation */
@keyframes colorchange-1 {
  0% { opacity: 1; }
  14% { opacity: .86; }
  28% { opacity: .72; }
  42% { opacity: .58; }
  56% { opacity: .44; }
  70% { opacity: .30; }
  84% { opacity: .15; }
  100% { opacity: 0; }
}

@keyframes colorchange-2 {
  0% { opacity: .86; }
  14% { opacity: .72; }
  28% { opacity: .58; }
  42% { opacity: .44; }
  56% { opacity: .30; }
  70% { opacity: .15; }
  84% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes colorchange-3 {
  0% { opacity: .72; }
  14% { opacity: .58; }
  28% { opacity: .44; }
  42% { opacity: .30; }
  56% { opacity: .15; }
  70% { opacity: 0; }
  84% { opacity: 1; }
  100% { opacity: .86; }
}

@keyframes colorchange-4 {
  0% { opacity: .58; }
  14% { opacity: .44; }
  28% { opacity: .30; }
  42% { opacity: .15; }
  56% { opacity: 0; }
  70% { opacity: 1; }
  84% { opacity: .86; }
  100% { opacity: .72; }
}

@keyframes colorchange-5 {
  0% { opacity: .44; }
  14% { opacity: .30; }
  28% { opacity: .15; }
  42% { opacity: 0; }
  56% { opacity: 1; }
  70% { opacity: .86; }
  84% { opacity: .72; }
  100% { opacity: .58; }
}

@keyframes colorchange-6 {
  0% { opacity: .30; }
  14% { opacity: .15; }
  28% { opacity: 0; }
  42% { opacity: 1; }
  56% { opacity: .86; }
  70% { opacity: .72; }
  84% { opacity: .58; }
  100% { opacity: .44; }
}

@keyframes colorchange-7 {
  0% { opacity: .15; }
  14% { opacity: 0; }
  28% { opacity: 1; }
  42% { opacity: .86; }
  56% { opacity: .72; }
  70% { opacity: .58; }
  84% { opacity: .44; }
  100% { opacity: .30; }
}

@keyframes colorchange-8 {
  0% { opacity: 0; }
  14% { opacity: 1; }
  28% { opacity: .86; }
  42% { opacity: .72; }
  56% { opacity: .58; }
  70% { opacity: .44; }
  84% { opacity: .30; }
  100% { opacity: .15; }
}
</style>