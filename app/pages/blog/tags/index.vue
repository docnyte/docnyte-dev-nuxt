<script setup lang="ts">
const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: posts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog').all()
)

if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'No blog posts found',
    fatal: true
  })
}

// Aggregate all tags with their post counts
const tagStats = computed(() => {
  const tagCounts = new Map<string, number>()

  posts.value?.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    }
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count) // Sort by popularity
})

const totalTags = computed(() => tagStats.value.length)
const totalPosts = computed(() => posts.value?.length || 0)

useSeoMeta({
  title: `All Tags - ${page.value?.title || 'Blog'}`,
  ogTitle: `All Tags - ${page.value?.title || 'Blog'}`,
  description: `Explore all ${totalTags.value} tags across ${totalPosts.value} blog posts. Find content by topic and interest.`,
  ogDescription: `Explore all ${totalTags.value} tags across ${totalPosts.value} blog posts. Find content by topic and interest.`
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      title="All Tags"
      :description="`Explore ${totalTags} tags across ${totalPosts} blog posts`"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    >
      <template #links>
        <UButton
          to="/blog"
          variant="outline"
          size="sm"
          icon="i-lucide-arrow-left"
          label="Back to Blog"
        />
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div v-if="tagStats.length > 0">
        <!-- Popular Tags Section -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4">
            Popular Tags
          </h2>
          <div class="flex flex-wrap gap-3">
            <Motion
              v-for="({ tag, count }, index) in tagStats.slice(0, 6)"
              :key="tag"
              :initial="{ opacity: 0, scale: 0.8 }"
              :while-in-view="{ opacity: 1, scale: 1 }"
              :transition="{ delay: 0.1 * index }"
              :in-view-options="{ once: true }"
            >
              <UButton
                :to="`/blog/tags/${encodeURIComponent(tag)}`"
                variant="soft"
                size="lg"
                class="hover:ring-2 hover:ring-primary transition-all"
              >
                <template #default>
                  <span class="font-medium">{{ tag }}</span>
                  <UBadge
                    :label="count.toString()"
                    variant="solid"
                    size="xs"
                    class="ml-2"
                  />
                </template>
              </UButton>
            </Motion>
          </div>
        </div>

        <!-- All Tags Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4">
            All Tags
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Motion
              v-for="({ tag, count }, index) in tagStats"
              :key="tag"
              :initial="{ opacity: 0, transform: 'translateY(10px)' }"
              :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
              :transition="{ delay: 0.05 * (index % 20) }"
              :in-view-options="{ once: true }"
            >
              <UButton
                :to="`/blog/tags/${encodeURIComponent(tag)}`"
                variant="ghost"
                class="w-full justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
              >
                <span class="font-medium">{{ tag }}</span>
                <UBadge
                  :label="count === 1 ? '1 post' : `${count} posts`"
                  variant="subtle"
                  size="xs"
                />
              </UButton>
            </Motion>
          </div>
        </div>
      </div>

      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-lucide-tags"
          class="w-12 h-12 mx-auto text-muted mb-4"
        />
        <h3 class="text-lg font-medium mb-2">
          No tags found
        </h3>
        <p class="text-muted mb-4">
          No tags are available at the moment.
        </p>
        <UButton
          to="/blog"
          variant="soft"
          label="Browse all posts"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
