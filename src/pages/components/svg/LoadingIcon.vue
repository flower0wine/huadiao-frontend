<template>
  <svg t="1720957907537" class="icon loading-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="4397" :style="$props">
    <path
        d="M144.205 202.496a136.678 136.678 0 1 0 273.357 0 136.678 136.678 0 1 0-273.357 0zM41.728 492.902a119.578 119.578 0 1 0 239.155 0 119.578 119.578 0 1 0-239.155 0zM144.23 749.158a102.502 102.502 0 1 0 205.005 0 102.502 102.502 0 1 0-205.005 0zM435.2 861.926a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0z m289.843-95.666a85.427 85.427 0 1 0 170.855 0 85.427 85.427 0 1 0-170.855 0z m136.704-290.433a68.326 68.326 0 1 0 136.653 0 68.326 68.326 0 1 0-136.653 0zM759.22 219.571a51.251 51.251 0 1 0 102.502 0 51.251 51.251 0 1 0-102.503 0zM512 85.376a34.176 34.176 0 1 0 68.352 0 34.176 34.176 0 1 0-68.352 0z"
        p-id="4398"></path>
  </svg>
</template>

<script>
import {SVG_COMPONENT_PROPS} from "@/pages/components/svg/svg-config";

export default {
  name: "LoadingIcon",
  props: SVG_COMPONENT_PROPS,
}
</script>

<style scoped>
.loading-icon {
  animation: rotate 1s steps(8) infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>