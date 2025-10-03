<script setup lang="ts">
const route = useRoute()
const tag = computed(() => decodeURIComponent(route.params.tag as string))

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

const { data: allPosts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const posts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.filter(post =>
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag.value)
  )
})

if (!allPosts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog posts not found',
    fatal: true
  })
}

const postCount = computed(() => posts.value?.length || 0)
const pageTitle = computed(() => `Posts tagged "${tag.value}"`)
const pageDescription = computed(() => `${postCount.value} post${postCount.value !== 1 ? 's' : ''} found`)

useSeoMeta({
  title: `${tag.value} Posts - ${page.value?.title || 'Blog'}`,
  ogTitle: `${tag.value} Posts - ${page.value?.title || 'Blog'}`,
  description: `Browse all blog posts tagged with "${tag.value}". Found ${postCount.value} posts.`,
  ogDescription: `Browse all blog posts tagged with "${tag.value}". Found ${postCount.value} posts.`
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="pageTitle"
      :description="pageDescription"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    >
      <template #links>
        <div class="flex flex-wrap gap-2">
          <UButton
            to="/blog"
            variant="outline"
            size="sm"
            icon="i-lucide-arrow-left"
            label="Back to Blog"
          />
          <UButton
            to="/blog/tags"
            variant="ghost"
            size="sm"
            icon="i-lucide-tag"
            label="All Tags"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <UBlogPosts
        v-if="posts && posts.length > 0"
        orientation="vertical"
      >
        <Motion
          v-for="(post, index) in posts"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="post.path"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
              header:
                index % 2 === 0
                  ? 'sm:-rotate-1 overflow-visible'
                  : 'sm:rotate-1 overflow-visible'
            }"
          >
            <template #footer>
              <div
                v-if="post.tags && post.tags.length > 0"
                class="flex flex-wrap gap-2 mt-3"
              >
                <UButton
                  v-for="postTag in post.tags"
                  :key="postTag"
                  :to="`/blog/tags/${encodeURIComponent(postTag)}`"
                  size="sm"
                  variant="soft"
                  :label="postTag"
                  :class="postTag === tag ? 'ring-2 ring-primary' : ''"
                />
              </div>
            </template>
          </UBlogPost>
        </Motion>
      </UBlogPosts>

      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-lucide-search-x"
          class="w-12 h-12 mx-auto text-muted mb-4"
        />
        <h3 class="text-lg font-medium mb-2">
          No posts found
        </h3>
        <p class="text-muted mb-4">
          No posts are tagged with "{{ tag }}"
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
