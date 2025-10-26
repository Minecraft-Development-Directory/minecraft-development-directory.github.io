<script lang="ts" setup>
/**
 * @credits Pergel <https://nuxtlabs.com/>
 */
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ title?: string; description?: string; headline?: string }>(),
  {
    title: "title",
    description: "description",
    headline: "MDD",
  }
);

const title = computed(() => props.title.slice(0, 60));
</script>

<template>
  <div class="w-full h-full bg-[#fffced]">
    <svg
      class="absolute top-0 right-0"
      width="1200"
      height="675"
      viewBox="0 0 1200 675"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="mix-blend-mode: overlay"
        opacity="0.7"
        filter="url(#filter0_f_448_25)"
      >
        <circle cx="901.5" cy="45.5" r="199.5" fill="#87993c" />
        <circle cx="600.5" cy="216.5" r="199.5" fill="#39a99f" />
        <circle cx="179.5" cy="317.5" r="199.5" fill="#4485be" />
      </g>
      <defs>
        <filter
          id="filter0_f_448_25"
          x="-240"
          y="-374"
          width="1561"
          height="1111"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="110"
            result="effect1_foregroundBlur_448_25"
          />
        </filter>
      </defs>
    </svg>

    <div class="w-[600px] pl-[100px] top-[150px]">
      <p class="uppercase text-[24px] text-[#668014] mb-4 font-semibold">
        {{ headline }}
      </p>
      <h1
        class="w-[680px] m-0 text-[50px] font-semibold mb-4 text-[#0f0f0f]"
        style="display: block; line-clamp: 2; text-overflow: ellipsis"
      >
        {{ title }}
      </h1>
      <p
        class="w-[680px] text-[30px] text-[#555555] leading-tight"
        style="display: block; line-clamp: 3; text-overflow: ellipsis"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="absolute top-[250px] right-[200px] flex flex-col justify-center items-center"
    >
      <svg
        class="absolute inset-0 size-46"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="6.5" x2="6.5" y2="44" stroke="#bfc97c" />
        <line x1="38.5" x2="38.5" y2="44" stroke="#bfc97c" />
        <line y1="5.5" x2="44" y2="5.5" stroke="#bfc97c" />
        <line y1="37.5" x2="44" y2="37.5" stroke="#bfc97c" />
        <circle cx="6.53613" cy="5.45508" r="1.5" fill="#87993c" />
        <circle cx="38.5957" cy="5.45508" r="1.5" fill="#87993c" />
        <circle cx="6.53711" cy="37.4551" r="1.5" fill="#87993c" />
        <circle cx="38.5957" cy="37.4551" r="1.5" fill="#87993c" />
      </svg>
      <UIcon
        name="i-lucide-container"
        class="size-18 shrink-0 text-[#668014]"
        mode="svg"
      />
    </div>
  </div>
</template>
