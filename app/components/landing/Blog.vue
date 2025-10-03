<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(5).all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'blogs posts not found', fatal: true })
}
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #footer>
          <div class="flex flex-col gap-2">
            <div
              v-if="post.tags && post.tags.length > 0"
              class="flex flex-wrap gap-1 p-2"
            >
              <UButton
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                :to="`/blog/tags/${encodeURIComponent(tag)}`"
                size="xs"
                variant="soft"
                :label="tag"
                class="relative z-10 hover:ring-2 hover:ring-primary transition-all"
                @click.stop
              />
            </div>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0 self-start"
              label="Read Article"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </div>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
