<template>
  <OverlayPage :is-loading="isLoading" title="FR-APL-01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button text="Buat Permohonan" :icon="['fas', 'paper-plane']" :styles="['big', 'blue']" @click.native="send" />
    </div>
    <!-- content -->
    <div v-if="schema">
      <Tabs>
        <Tab title="Preview Schema" class="tab__flex">
          <div class="mb-3">
            <label class="form-label tw-self-center">Skema :</label>
            <input :value="schema.title" type="text" class="form-control" disabled>
          </div>
          <div class="mb-3">
            <label class="form-label tw-self-center">Kode :</label>
            <input :value="schema.code" type="text" class="form-control" disabled>
          </div>
          <div class="mb-3">
            <label class="form-label tw-self-center">Deskripsi :</label>
            <textarea :value="schema.description" class="form-control" disabled />
          </div>
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
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserName" class="form-label tw-self-center">Nama Lengkap</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserName" v-model="form.user.name" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- identity number -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputIdentityNumber" class="form-label tw-self-center">Nomor Identitas</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputIdentityNumber" v-model="form.user.identity_number" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- gender -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputGender" class="form-label tw-self-center">Jenis Kelamin</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <select id="inputPurpose" v-model="form.user.gender" class="form-control" disabled>
                    <option value="Male">Pria</option>
                    <option value="Female">Wanita</option>
                  </select>
                </div>
              </div>
              <!-- birth -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserPlaceOfBirth" class="form-label tw-self-center">Tempat Lahir</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6 tw-flex md:tw-space-x-2">
                  <input id="inputUserPlaceOfBirth" v-model="form.user.place_of_birth" type="text" class="form-control" disabled>
                  <input id="inputUserDateOfBirth" v-model="form.user.date_of_birth" type="date" class="form-control" disabled>
                </div>
              </div>
              <!-- nationality -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserNationality" class="form-label tw-self-center">Kebangsaan</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserNationality" v-model="form.user.nationality" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- address -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserAddress" class="form-label tw-self-center">Alamat Rumah</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserAddress" v-model="form.user.address" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- email -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserEmail" class="form-label tw-self-center">Email</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserEmail" v-model="form.user.email" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- phone -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserPhone" class="form-label tw-self-center">Nomor Telepon</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserPhone" v-model="form.user.phone" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- last education -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputUserLastEducation" class="form-label tw-self-center">Pendidikan Terakhir</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputUserLastEducation" v-model="form.user.last_education" type="text" class="form-control" disabled>
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
              <!-- job -->
              <div class="mb-2 tw-flex tw-flex-row tw-space-x-6 tw-justify-center">
                <div class="form-check">
                  <input id="inputJob1" v-model="form.job" class="form-check-input" type="radio" name="inputJob" value="1" disabled>
                  <label class="form-check-label" for="inputJob1">
                    Saya Bekerja
                  </label>
                </div>
                <div class="form-check">
                  <input id="inputJob2" v-model="form.job" class="form-check-input" type="radio" name="inputJob" value="0" disabled>
                  <label class="form-check-label" for="inputJob2">
                    Saya Tidak Bekerja
                  </label>
                </div>
              </div>
              <!-- name -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputCompanyName" class="form-label tw-self-center">Nama</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputCompanyName" v-model="form.company.name" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- position -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputCompanyPosition" class="form-label tw-self-center">Jabatan</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputCompanyPosition" v-model="form.company.position" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- address -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputCompanyAddress" class="form-label tw-self-center">Alamat</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputCompanyAddress" v-model="form.company.address" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- email -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputCompanyEmail" class="form-label tw-self-center">Email</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputCompanyEmail" v-model="form.company.email" type="text" class="form-control" disabled>
                </div>
              </div>
              <!-- phone -->
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputCompanyPhone" class="form-label tw-self-center">Nomor Telepon</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <input id="inputCompanyPhone" v-model="form.company.phone" type="text" class="form-control" disabled>
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
              <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                <div class="tw-w-full md:tw-w-1/6 tw-flex">
                  <label for="inputPurpose" class="form-label tw-self-center">Nama</label>
                </div>
                <div class="tw-w-full md:tw-w-5/6">
                  <select id="inputPurpose" v-model="form.purpose" class="form-control">
                    <option value="Certification">Sertifikasi</option>
                    <option value="Recertification">Sertifikasi Ulang</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </Tab>
        <Tab title="File" class="tab__flex">
          <section class="tw-mb-8">
            <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
              File Persyaaratan
            </div>
            <div class="form">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th width="5%" class="tw-text-center">#</th>
                    <th width="30%" class="tw-text-center">Nama</th>
                    <th width="35%" class="tw-text-center">Format</th>
                    <th width="30%" class="tw-text-center">Pilih File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in schema.requirement_files" :key="i">
                    <td>{{ i+1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ [...item.format].join(', ') }}</td>
                    <td>
                      <v-select v-model="form.files[i].file" class="vue-select" :options="files" :reduce="e => e.id" label="name" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </Tab>
      </Tabs>
    </div>
  </OverlayPage>
</template>

<script>
import { computed, defineComponent, reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud'

export default defineComponent({
  props: {
    schemaId: {
      type: Number,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { $sleep, $auth, $moment, store, $swal } = useContext()
    const crud = useCrud('/accession/schemas')
    const crudReq = useCrud('/accession/schemas/' + props.schemaId)
    const crudFile = useCrud('/accession/files')
    const close = () => emit('close')
    const isLoading = ref(true)
    const schema = ref(null)
    const files = ref(null)
    const user = computed(() => store.state.auth.user)
    const form = reactive({
      user: {
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone,

        identity_number: user.value.data.identity_number,
        gender: user.value.data.gender,
        place_of_birth: user.value.data.place_of_birth,
        date_of_birth: $moment(user.value.data.date_of_birth).format('YYYY-MM-DD').toString(),
        nationality: user.value.data.nationality,
        address: user.value.data.address,
        last_education: user.value.data.last_education,
      },
      company: {
        name: user.value.data.company_name,
        position: user.value.data.company_position,
        address: user.value.data.company_address,
        email: user.value.data.company_email,
        phone: user.value.data.company_phone,
      },
      job: user.value.data.job,
      files: [],
      purpose: 'Certification',
    })

    const { fetch } = useFetch(async () => {
      isLoading.value = true
      await $sleep(500)
      let res
      res = await crud.show(props.schemaId)
      schema.value = res.data.data
      form.files = []
      schema.value.requirement_files.forEach(e => {
        form.files.push({
          name: e.name,
          file: '',
        })
      })
      await $auth.refreshUser()
      // user.value = $auth.user
      // console.log($auth.user)

      res = await crudFile.read()
      files.value = res.data.data
      isLoading.value = false
    })
    fetch()

    //
    const send = () => {
      crudReq.create(form).then(e => {
        $swal({
          icon: 'success',
          title: 'Berhasil',
          text: 'Mengirim permohonan mengikuti skema berhasil! Cek di menu "asement saya" untuk info selanjutnya.'
        }).then(() => close())
      })
    }

    const a = () => {
      // $auth.refreshTokens()
      console.log($auth)
    }

    return {
      a,
      isLoading,
      close,
      form,
      schema,
      files,
      send
    }
  },
})
</script>

