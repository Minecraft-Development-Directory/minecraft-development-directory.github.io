<script setup lang="ts">
interface Contributor {
  username: string;
}
interface ListProps {
  contributors?: Contributor[];
}

const props = withDefaults(defineProps<ListProps>(), {
  contributors: () => [],
});

const contributorsList = computed(() => props.contributors ?? []);
</script>

<template>
  <div class="size-full p-4">
    <Motion
      :initial="{ opacity: 0, transform: 'translateX(-20px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateX(0)' }"
      :transition="{ duration: 0.5 }"
      :in-view-options="{ once: true }"
      class="flex flex-row gap-2 items-start justify-start"
    >
      <Motion
        v-for="(contributor, index) in contributorsList"
        :key="contributor.username"
        :initial="{ opacity: 0, scale: 0.8 }"
        :while-in-view="{ opacity: 1, scale: 1 }"
        :in-view-options="{ once: true }"
        :while-hover="{ scale: 1.1, y: -5 }"
        :transition="{
          duration: 0.3,
          delay: index * 0.1,
          type: 'spring',
          stiffness: 100,
        }"
        class="flex flex-col items-center"
      >
        <UTooltip :text="contributor.username" :delay-duration="0">
          <NuxtLink
            :to="`https://github.com/${contributor.username}`"
            :aria-label="contributor.username"
            target="_blank"
            class="block"
          >
            <Motion
              :while-hover="{ rotate: 5 }"
              :transition="{ type: 'spring', stiffness: 300 }"
            >
              <NuxtImg
                width="56"
                height="56"
                :src="`https://github.com/${contributor.username}.png?size=56`"
                :srcset="`https://github.com/${contributor.username}.png?size=112 2x`"
                :alt="contributor.username"
                class="ring-2 ring-default hover:ring-inverted transition rounded-full size-12 aspect-square"
                loading="lazy"
              />
            </Motion>
          </NuxtLink>
        </UTooltip>
      </Motion>
    </Motion>
  </div>
</template>
