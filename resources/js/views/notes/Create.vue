<template>
  <div>
     <div class="row">
         <div class="col-md-6">
             <div class="card">
                 <div class="card-header">New Note</div>
                 <div class="card-body"></div>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      subjects: [],
    };
  },

  mounted() {
    this.getSubjects();
  },

  methods: {
    async getSubjects() {
      let response = await axios.get("/api/subjects/index");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },
  },
};
</script>
