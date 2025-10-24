<template>
  <UMain class="flex-1">
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <BlogAsideLeftTop />
            <BlogAsideLeftBody />
          </UPageAside>
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>
