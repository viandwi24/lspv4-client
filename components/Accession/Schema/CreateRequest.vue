<template>
  <OverlayPage :is-loading="isLoading" :title="schema ? `[${schema.title}] FR-APL-01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI` : ''" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Buat Permohonan" :icon="['fas', 'paper-plane']" :styles="['big', 'blue']" />
    </div>
    <!-- content -->
    <div v-if="schema">
      <Tabs>
        <Tab title="Preview Schema" class="tab__flex">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th width="5%" class="tw-text-center">#</th>
                <th width="20%" class="tw-text-center">Kode</th>
                <th width="55%" class="tw-text-center">Unit</th>
                <th width="20%" class="tw-text-center">Jenis Standar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(unit, i) in schema.competency_units" :key="i">
                <td>{{ i+1 }}</td>
                <td>{{ unit.code }}</td>
                <td>{{ unit.title }}</td>
                <td>{{ unit.standard_type }}</td>
              </tr>
            </tbody>
          </table>
        </Tab>
        <Tab title="Bagian 1" class="tab__flex">
          <!-- Rincian Data Pemohon Sertifikasi -->
          <section class="tw-mb-8">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
              Rincian Data Pemohon Sertifikasi
            </div>
            <div class="form">
              <!-- name -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserName" class="form-label tw-self-center">Nama Lengkap</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserName" v-model="form.user.name" type="text" class="form-control" placeholder="Nama Lengkap">
                </div>
              </div>
              <!-- birth -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserPlaceOfBirth" class="form-label tw-self-center">Tempat Lahir</label>
                </div>
                <div class="tw-w-5/6 tw-flex tw-space-x-2">
                  <input id="inputUserPlaceOfBirth" v-model="form.user.place_of_birth" type="text" class="form-control" placeholder="Tempat Lahir">
                  <input id="inputUserDateOfBirth" v-model="form.user.date_of_birth" type="date" class="form-control" placeholder="Tanggal Lahir">
                </div>
              </div>
              <!-- nationality -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserNationality" class="form-label tw-self-center">Kebangsaan</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserNationality" v-model="form.user.nationality" type="text" class="form-control" placeholder="Kebangsaan">
                </div>
              </div>
              <!-- address -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserAddress" class="form-label tw-self-center">Alamat Rumah</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserAddress" v-model="form.user.address" type="text" class="form-control" placeholder="Alamat Rumah">
                </div>
              </div>
              <!-- email -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserEmail" class="form-label tw-self-center">Email</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserEmail" v-model="form.user.email" type="text" class="form-control" placeholder="Email">
                </div>
              </div>
              <!-- phone -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserPhone" class="form-label tw-self-center">Nomor Telepon</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserPhone" v-model="form.user.phone" type="text" class="form-control" placeholder="Nomor Telepon">
                </div>
              </div>
              <!-- last education -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputUserLastEducation" class="form-label tw-self-center">Pendidikan Terakhir</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputUserLastEducation" v-model="form.user.last_education" type="text" class="form-control" placeholder="Pendidikan Terakhir">
                </div>
              </div>
            </div>
          </section>
        </Tab>
        <Tab title="Bagian 2" class="tab__flex">
          <!-- Data Pekerjaan Sekarang -->
          <section class="tw-mb-4">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
              Data Pekerjaan Sekarang
            </div>
            <div class="form">
              <!-- name -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputCompanyName" class="form-label tw-self-center">Nama</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputCompanyName" v-model="form.company.name" type="text" class="form-control" placeholder="Nama Lembaga / Perusahaan">
                </div>
              </div>
              <!-- position -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputCompanyPosition" class="form-label tw-self-center">Jabatan</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputCompanyPosition" v-model="form.company.position" type="text" class="form-control" placeholder="Jabatan">
                </div>
              </div>
              <!-- address -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputCompanyAddress" class="form-label tw-self-center">Alamat</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputCompanyAddress" v-model="form.company.address" type="text" class="form-control" placeholder="Alamat">
                </div>
              </div>
              <!-- email -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputCompanyEmail" class="form-label tw-self-center">Email</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputCompanyEmail" v-model="form.company.email" type="text" class="form-control" placeholder="Email">
                </div>
              </div>
              <!-- phone -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputCompanyPhone" class="form-label tw-self-center">Nomor Telepon</label>
                </div>
                <div class="tw-w-5/6">
                  <input id="inputCompanyPhone" v-model="form.company.phone" type="text" class="form-control" placeholder="Nomor Telepon">
                </div>
              </div>
            </div>
          </section>
        </Tab>
        <Tab title="Bagian 3" class="tab__flex">
          <!-- Data Sertifikasi -->
          <section class="tw-mb-4">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
              Data Sertifikasi
            </div>
            <div class="form">
              <!-- purpose -->
              <div class="mb-3 tw-flex tw-flex-row tw-space-x-2">
                <div class="tw-w-1/6 tw-flex">
                  <label for="inputPurpose" class="form-label tw-self-center">Nama</label>
                </div>
                <div class="tw-w-5/6">
                  <select id="inputPurpose" v-model="form.purpose" class="form-control" placeholder="Tujuan">
                    <option value="certification">Sertifikasi</option>
                    <option value="recertification">Sertifikasi Ulang</option>
                    <option value="recertification">Lainnya</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </Tab>
      </Tabs>
    </div>
  </OverlayPage>
</template>

<script>
import { defineComponent, reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud'

export default defineComponent({
  props: {
    schemaId: {
      type: Number,
      required: true,
    }
  },
  setup(_, { emit }) {
    const { $sleep } = useContext()
    const crud = useCrud('/accession/schemas')
    const close = () => emit('close')
    const isLoading = ref(true)
    const schema = ref(null)
    const form = reactive({
      user: {
        name: '',
        place_of_birth: '',
        date_of_birth: '',
        nationality: '',
        address: '',
        email: '',
        phone: '',
        last_education: ''
      },
      company: {
        name: '',
        position: '',
        address: '',
        email: '',
        phone: '',
      },
      purpose: 'certification',
    })

    const { fetch } = useFetch(async () => {
      isLoading.value = true
      await $sleep(500)
      const res = await crud.show(1)
      schema.value = res.data.data
      isLoading.value = false
      console.log(schema)
    })
    fetch()

    return {
      isLoading,
      close,
      form,
      schema,
    }
  },
})
</script>

