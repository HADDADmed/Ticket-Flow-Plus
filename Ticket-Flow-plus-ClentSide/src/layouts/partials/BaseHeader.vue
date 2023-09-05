<script setup>

defineProps({
  title: {
    type: String,
    description: "The title of page heading section",
  },
  subtitle: {
    type: String,
    description: "The subtitle of page heading section",
  },
  routesfirst2: {
    type: Array,
    description: "The subtitle of page heading section",
  },
  routeslast: {
    type: Array,
    description: "The subtitle of page heading section",
  },
});

</script>


<template>
  <!-- Hero -->
  <BasePageHeading :title="title" :subtitle="subtitle" >
    <template #extra>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-alt">
          <li v-for="routefirst2 in routesfirst2" class="breadcrumb-item">
            <a class="link-fx" href="javascript:void(0)">{{ routefirst2 }}</a>
          </li>
          <li v-for="routelast in routeslast" class="breadcrumb-item" aria-current="page">{{routelast}}</li>
        </ol>
      </nav>
    </template>
  </BasePageHeading>
  <!-- END Hero -->
</template>
