<script>
import { mapActions, mapState } from 'pinia';
import { useStorage } from '../stores/storage.js';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'AddBook',
  props: ['id'],
  data() {
    const bookSchema = yup.object({
      moduleCode: yup.string().required("El módulo es obligatorio, por favor seleccione uno"),
      publisher: yup.string().required("La editorial es obligatoria"),
      price: yup.number().required("El precio es obligatorio").min(0, "El precio debe ser mayor que 0").typeError("El precio debe ser un número"),
      pages: yup.number().required("Las páginas son obligatorias").min(0, "Las páginas deben ser mayor que 0").typeError("Las páginas deben ser un número"),
      status: yup.string().required("El estado es obligatorio").oneOf(["Good", "New", "Old"]),
      comments: yup.string(),
    });

    return {
      bookSchema,
      book: {},
      estado: ["Good", "New", "Old"],
    };
  },
  computed: {
    ...mapState(useStorage, ['modules']),
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  async created() {
    if (this.id) {
      this.book = await this.getDBBook(this.id);
    }
  },
  watch: {
    id() {
      this.resetForm();
    },
  },
  methods: {
    async handleBook(values) {
      if (this.id === undefined) {
        await this.addBookST(values);
      } else {
        await this.editBookST(values);
      }
      this.$router.push('/list');
    },
    async resetForm() {
      if (this.id === undefined) {
        this.book = {};
      } else {
        this.book = await this.getDBBook(this.id);
      }
    },
    ...mapActions(useStorage, ['getDBBook', 'addBookST', 'editBookST']),
  },
};
</script>

<<template>
  <div id="form">
    <h2>{{ id ? 'Editar' : 'Añadir' }} libro</h2>
    <Form :validation-schema="bookSchema" @submit="handleBook" :initial-values="book">
      <div v-if="id">
        <label for="id">ID:</label>
        <Field type="text" id="id" name="id" v-model="book.id" :value="book.id" readonly disabled />
      </div>
      <div>
        <label for="moduleCode">Módulo:</label>
        <Field as="select" id="moduleCode" name="moduleCode" v-model="book.moduleCode" required>
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">{{ module.cliteral }}</option>
        </Field>
        <ErrorMessage name="moduleCode" class="error" />
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <Field type="text" id="publisher" name="publisher" v-model="book.publisher" />
        <ErrorMessage name="publisher" class="error" />
      </div>
      <div>
        <label for="price">Precio:</label>
        <Field type="number" id="price" name="price" v-model="book.price" />
        <ErrorMessage name="price" class="error" />
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <Field type="number" id="pages" name="pages" v-model="book.pages" />
        <ErrorMessage name="pages" class="error" />
      </div>
      <div>
        <label>Estado:</label>
        <div v-for="status in estado" :key="status">
          <Field type="radio" :value="status" name="status" v-model="book.status" />
          {{ status }}
        </div>
        <ErrorMessage name="status" class="error" />
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <Field as="textarea" id="comments" name="comments" v-model="book.comments" />
        <ErrorMessage name="comments" class="error" />
      </div>
      <button type="submit">{{ id ? 'Editar' : 'Añadir' }}</button>
      <button type="reset" @click="resetForm">Reset</button>
    </Form>
  </div>
</template>