<template>
  <div class="mb-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb pl-0 mb-0 fs-14">
        <li class="breadcrumb-item">{{ title }}</li>
        <li class="breadcrumb-item active">{{ subtitle }}</li>
      </ol>
    </nav>
    <p class="fs-24 fw-medium">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "HeaderTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>
