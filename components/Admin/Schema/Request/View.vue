<template>
  <OverlayPage :is-loading="isLoading" title="FR-APL-01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI" @close="close">
    <!-- footer button -->
    <div slot="footer-button">
      <Button v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Approved'" text="Batalkan Penyetujan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="cancelApproved" />
      <Button v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Rejected'" text="Batalkan Penolakan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="cancelRejected" />
    </div>

    <!-- content -->
    <div v-if="schemaRequest && cachedRequestSchema" class="tw-mb-8">
      <!-- section:user -->
      <Tabs class="tw-mb-8">
        <Tab title="List User Yang Dipilih" class="tab__flex tw-shadow-lg">
          <div v-if="cachedRequestSchema && cachedRequestSchema.length === 0">
            Tidak ada user yang dipilih.
          </div>
          <Collapsible>
            <CollapsibleItem v-for="(item, i) in cachedRequestSchema" :key="i" :title="`${i+1}. ${cachedRequestSchema[i].user.name} - ${cachedRequestSchema[i].user.email}`">
              <Tabs>
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
                          <label :for="`${i}_inputUserName`" class="form-label tw-self-center">Nama Lengkap</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserName`" :value="cachedRequestSchema[i].user.name" type="text" class="form-control" placeholder="Nama Lengkap" disabled>
                        </div>
                      </div>
                      <!-- identity number -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputIdentityNumber`" class="form-label tw-self-center">Nomor Identitas</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputIdentityNumber`" v-model="cachedRequestSchema[i].user.identity_number" type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <!-- gender -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputGender`" class="form-label tw-self-center">Jenis Kelamin</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <select :id="`${i}_inputPurpose`" v-model="cachedRequestSchema[i].user.gender" class="form-control" disabled>
                            <option value="Male">Pria</option>
                            <option value="Female">Wanita</option>
                          </select>
                        </div>
                      </div>
                      <!-- birth -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserPlaceOfBirth`" class="form-label tw-self-center">Tempat Lahir</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6 tw-flex tw-space-x-2">
                          <input :id="`${i}_inputUserPlaceOfBirth`" v-model="cachedRequestSchema[i].user.data.place_of_birth" type="text" class="form-control" placeholder="Tempat Lahir" disabled>
                          <input :id="`${i}_inputUserDateOfBirth`" :value="$moment(cachedRequestSchema[i].user.data.date_of_birth).format('YYYY-MM-DD').toString()" type="date" class="form-control" placeholder="Tanggal Lahir" disabled>
                        </div>
                      </div>
                      <!-- nationality -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserNationality`" class="form-label tw-self-center">Kebangsaan</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserNationality`" v-model="cachedRequestSchema[i].user.data.nationality" type="text" class="form-control" placeholder="Kebangsaan" disabled>
                        </div>
                      </div>
                      <!-- address -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserAddress`" class="form-label tw-self-center">Alamat Rumah</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserAddress`" v-model="cachedRequestSchema[i].user.data.address" type="text" class="form-control" placeholder="Alamat Rumah" disabled>
                        </div>
                      </div>
                      <!-- email -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserEmail`" class="form-label tw-self-center">Email</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserEmail`" v-model="cachedRequestSchema[i].user.email" type="text" class="form-control" placeholder="Email" disabled>
                        </div>
                      </div>
                      <!-- phone -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserPhone`" class="form-label tw-self-center">Nomor Telepon</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserPhone`" v-model="cachedRequestSchema[i].user.phone" type="text" class="form-control" placeholder="Nomor Telepon" disabled>
                        </div>
                      </div>
                      <!-- last education -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputUserLastEducation`" class="form-label tw-self-center">Pendidikan Terakhir</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputUserLastEducation`" v-model="cachedRequestSchema[i].user.data.last_education" type="text" class="form-control" placeholder="Pendidikan Terakhir" disabled>
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
                      <div class="mb-2 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-6 tw-justify-center">
                        <div class="form-check">
                          <input :id="`${i}_inputJob1`" v-model="cachedRequestSchema[i].user.data.job" class="form-check-input" type="radio" name="inputJob" value="1" disabled>
                          <label class="form-check-label" :for="`${i}_inputJob1`">
                            Saya Bekerja
                          </label>
                        </div>
                        <div class="form-check">
                          <input :id="`${i}_inputJob2`" v-model="cachedRequestSchema[i].user.data.job" class="form-check-input" type="radio" name="inputJob" value="0" disabled>
                          <label class="form-check-label" :for="`${i}_inputJob2`">
                            Saya Tidak Bekerja
                          </label>
                        </div>
                      </div>
                      <!-- name -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputCompanyName`" class="form-label tw-self-center">Nama</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputCompanyName`" v-model="cachedRequestSchema[i].user.data.company_name" type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <!-- position -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputCompanyPosition`" class="form-label tw-self-center">Jabatan</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputCompanyPosition`" v-model="cachedRequestSchema[i].user.data.company_position" type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <!-- address -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputCompanyAddress`" class="form-label tw-self-center">Alamat</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputCompanyAddress`" v-model="cachedRequestSchema[i].user.data.company_address" type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <!-- email -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputCompanyEmail`" class="form-label tw-self-center">Email</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputCompanyEmail`" v-model="cachedRequestSchema[i].user.data.company_email" type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <!-- phone -->
                      <div class="mb-3 tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-2">
                        <div class="tw-w-full md:tw-w-1/6 tw-flex">
                          <label :for="`${i}_inputCompanyPhone`" class="form-label tw-self-center">Nomor Telepon</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <input :id="`${i}_inputCompanyPhone`" v-model="cachedRequestSchema[i].user.data.company_phone" type="text" class="form-control" disabled>
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
                          <label :for="`${i}_inputPurpose`" class="form-label tw-self-center">Nama</label>
                        </div>
                        <div class="tw-w-full md:tw-w-5/6">
                          <select :id="`${i}_inputPurpose`" v-model="cachedRequestSchema[i].purpose" class="form-control" placeholder="Tujuan" disabled>
                            <option value="certification">Sertifikasi</option>
                            <option value="recertification">Sertifikasi Ulang</option>
                            <option value="other">Lainnya</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tab>
                <Tab title="File Persyaratan" class="tab__flex">
                  <!-- File Persyaratan -->
                  <section class="tw-mb-8">
                    <div class="tw-text-gray-700 tw-font-semibold tw-text-xl tw-mb-4 tw-pb-1 tw-inline-block tw-border-b-2 tw-border-gray-500">
                      File Persyaratan
                    </div>
                    <div class="form">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th width="5%" class="tw-text-center">#</th>
                            <th width="40%" class="tw-text-center">Nama</th>
                            <th width="15%" class="tw-text-center">Format</th>
                            <th width="15%" class="tw-text-center">Tanggal Upload</th>
                            <th width="10%" class="tw-text-center">...</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(file, j) in cachedRequestSchema[i].files" :key="j">
                            <td>{{ j+1 }}</td>
                            <td>{{ file.name }}</td>
                            <td>{{ file.type }}</td>
                            <td>{{ $moment(file.created_at).format('DD/MM/YYYY HH:mm') }}</td>
                            <td class="tw-text-center">
                              <button class="btn btn-success btn-sm" @click="downloadFile(cachedRequestSchema[i], file)">Unduh</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </Tab>
                <Tab title="Signature" class="tab__flex">
                  <!-- File Persyaratan -->
                  <section class="tw-mb-8">
                    <div class="tw-text-center">
                      <img :src="cachedRequestSchema[i].user.signature" alt="Signature" class="tw-inline-block">
                      <div class="tw-text-sm tw-font-semibold tw-text-gray-600">
                        {{ cachedRequestSchema[i].user.name }}
                      </div>
                      <div class="tw-text-xs tw-text-gray-600">
                        {{ cachedRequestSchema[i].user.name }}
                      </div>
                    </div>
                  </section>
                </Tab>
              </Tabs>
            </CollapsibleItem>
          </Collapsible>
        </Tab>
      </Tabs>
      <!-- section:control -->
      <Tabs class="tw-mb-8">
        <Tab v-if="cachedRequestSchema && cachedRequestSchema[0] && cachedRequestSchema[0].status === 'Pending'" title="Aksi Dari Admin" class="tab__flex tw-shadow-lg">
          <div class="form">
            <div class="mb-3">
              <label for="inputStatus">Ganti Status :</label>
              <select id="inputStatus" v-model="input.status" class="form-control">
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <section v-if="input.status == 'Approved'">
              <div class="mb-3">
                <label for="inputAsesor">Asesmen akan dilakukan oleh Asesor :</label>
                <v-select id="inputAsesor" v-model="input.assessor" :reduce="e => e.user_id" label="name" :filterable="false" :options="inputAsesorValues" @search="inputAsesorOnSearch">
                  <template slot="no-options">
                    ketik untuk mencari asesor
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.name }} ({{ option.email }}) [id: {{ option.user_id }}]
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    {{ option.name }} ({{ option.email }}) [id: {{ option.user_id }}]
                  </template>
                </v-select>
              </div>
              <div class="mb-3">
                <label for="inputSchedule">Asesmen akan dilakukan pada Jadwal :</label>
                <v-select id="inputSchedule" v-model="input.schedule" :reduce="e => e.schedule_id" label="title" :filterable="false" :options="inputScheduleValues" @search="inputScheduleOnSearch">
                  <template slot="no-options">
                    ketik untuk mencari jadwal
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.title }} ({{ $moment(option.date_start).format('DD/MM/YYYY').toString() }} - {{ $moment(option.date_end).format('DD/MM/YYYY').toString() }}) [id: {{ option.schedule_id }}]
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    {{ option.title }} ({{ $moment(option.date_start).format('DD/MM/YYYY').toString() }} - {{ $moment(option.date_end).format('DD/MM/YYYY').toString() }}) [id: {{ option.schedule_id }}]
                  </template>
                </v-select>
              </div>
              <div class="mb-3">
                <label for="inputPlace">Asesmen akan dilakukan pada Tempat Uji :</label>
                <v-select id="inputPlace" v-model="input.place" :reduce="e => e.id" label="name" :filterable="false" :options="inputPlaceValues" @search="inputPlaceOnSearch">
                  <template slot="no-options">
                    ketik untuk mencari tempat
                  </template>
                  <template slot="option" slot-scope="option">
                    {{ option.place.name }} - {{ option.name }} [id: {{ option.id }}]
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    {{ option.place.name }} - {{ option.name }} [id: {{ option.id }}]
                  </template>
                </v-select>
              </div>
              <div class="mb-3">
                <label for="inputNote">Tulis Catatan :</label>
                <textarea id="inputNote" v-model="input.note" class="form-control" />
              </div>
              <div class="mb-3 md:tw-flex tw-justify-between">
                <div class="tw-flex">
                  <div class="tw-text-xs tw-px-4 md:tw-px-0 tw-text-gray-400 tw-self-center">
                    *Dengan menyetujui maka anda juga telah menandatangani formulir permohonan ini.
                  </div>
                </div>
                <div class="tw-flex-1 tw-flex tw-flex-row tw-justify-end">
                  <Button text="Setujui Permohonan" :icon="['fas', 'check']" :styles="['big', 'blue']" @click.native="accept" />
                </div>
              </div>
            </section>
            <section v-if="input.status == 'Rejected'">
              <div class="mb-3">
                <label for="inputNote">Tulis Catatan :</label>
                <textarea id="inputNote" v-model="input.note" class="form-control" />
              </div>
              <div class="mb-3 md:tw-flex tw-justify-between">
                <div class="tw-flex">
                  <div class="tw-text-xs tw-px-4 md:tw-px-0 tw-text-gray-400 tw-self-center">
                    *Dengan menolak permohonan ini maka anda juga telah menandatangani formulir permohonan ini.
                  </div>
                </div>
                <div class="tw-flex-1 tw-flex tw-flex-row tw-justify-end">
                  <Button text="Tolak Permohonan" :icon="['fas', 'times']" :styles="['big', 'red']" @click.native="reject" />
                </div>
              </div>
            </section>
          </div>
        </Tab>
      </Tabs>
    </div>
  </OverlayPage>
</template>

<script>
import { defineComponent, ref, onMounted, useContext, reactive } from '@nuxtjs/composition-api'
import { useCrud } from '@/api/crud'
import fileDownload from 'js-file-download'

export default defineComponent({
  props: {
    schemaId: {
      type: Number,
      required: true,
    },
    schema: {
      type: Object,
      required: true,
    },
    schemaRequestId: {
      type: [Number, Array],
      required: true,
    }
  },
  setup (props, { emit }) {
    const { $sleep, $axios, $overlayLoading } = useContext()
    const isLoading = ref(true)
    const schemaRequest = ref({})
    const close = () => emit('close')
    const crud = useCrud(`/admin/schemas/${props.schemaId}/requests`)
    const cachedRequestSchema = ref(null)
    const input = reactive({
      note: 'Permohonan Disetujui',
      status: 'Approved',
      assessor: '',
      schedule: '',
      place: '',
    })
    const { accept, reject, cancelApproved, cancelRejected } = useStatusChange(input, cachedRequestSchema, crud, close)
    const { inputAsesorValues, inputAsesorOnSearch } = useSelectAssessor(props.schemaId)
    const { inputScheduleValues, inputScheduleOnSearch } = useSelectSchedule(props.schemaId)
    const { inputPlaceValues, inputPlaceOnSearch } = useSelectPlace(props.schemaId)
    const { inputNewUserValues, inputNewUserOnSearch } = useSelectNewUser(props.schemaId)

    // mounted
    onMounted(async () => {
      const ids = Array.isArray(props.schemaRequestId) ? props.schemaRequestId : [props.schemaRequestId]
      cachedRequestSchema.value = []
      if (ids) {
        await $sleep(500)
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          try {
            const http = await crud.show(id)
            const data = http.data.data
            cachedRequestSchema.value.push(data)
          } catch (error) {
          }
        }
      }
      isLoading.value = false
    })

    // funcs

    //
    const downloadFile = async (schemaRequest, file) => {
      $overlayLoading.show()
      try {
        const response = await $axios({
          url: `/admin/schemas/${props.schemaId}/file/download/${file.id}`,
          method: 'GET',
          responseType: 'blob',
        })
        fileDownload(response.data, `${props.schema.id}_${props.schema.title}___${schemaRequest.id}_${schemaRequest.user_name}___${file.name}`)
      } catch (error) {
      }
      $overlayLoading.hide()
    }

    return {
      isLoading,
      schemaRequest,
      cachedRequestSchema,
      input,
      close,

      inputAsesorValues, inputAsesorOnSearch,
      inputScheduleValues, inputScheduleOnSearch,
      inputPlaceValues, inputPlaceOnSearch,
      inputNewUserValues, inputNewUserOnSearch,

      accept,
      reject,
      cancelApproved,
      cancelRejected,

      downloadFile,
    }
  },
})

function useSelectNewUser (schemaId) {
  const { $debounce, $axios  } = useContext()
  const inputNewUserValues = ref([])
  const inputNewUserOnSearch = (search, loading) => {
    loading(true)
    searchData(search, loading)
  }

  const searchData = $debounce((search, loading) => {
    $axios({
      method: 'GET',
      url: `/admin/schemas/${schemaId}/requests/get-pending-user`,
      params: {
        filters: {
          search
        }
      }
    }).then((res) => {
      try {
        inputNewUserValues.value = res.data.data
      } catch (error) {
      }
      loading(false)
    })
  }, 350)

  return { inputNewUserValues, inputNewUserOnSearch }
}

function useSelectPlace (schemaId) {
  const { $debounce, $axios  } = useContext()
  const inputPlaceValues = ref([])
  const inputPlaceOnSearch = (search, loading) => {
    loading(true)
    searchData(search, loading)
  }

  const searchData = $debounce((search, loading) => {
    $axios({
      method: 'GET',
      url: `/admin/schemas/${schemaId}/rooms`,
      params: {
        filters: {
          search
        }
      }
    }).then((res) => {
      try {
        inputPlaceValues.value = res.data.data
      } catch (error) {
      }
      loading(false)
    })
  }, 350)

  return { inputPlaceValues, inputPlaceOnSearch }
}

function useSelectSchedule (schemaId) {
  const { $debounce, $axios  } = useContext()
  const inputScheduleValues = ref([])
  const inputScheduleOnSearch = (search, loading) => {
    loading(true)
    searchData(search, loading)
  }

  const searchData = $debounce((search, loading) => {
    $axios({
      method: 'GET',
      url: `/admin/schemas/${schemaId}/schedules`,
      params: {
        filters: {
          search
        }
      }
    }).then((res) => {
      try {
        inputScheduleValues.value = res.data.data
      } catch (error) {
      }
      loading(false)
    })
  }, 350)

  return { inputScheduleValues, inputScheduleOnSearch }
}

function useSelectAssessor (schemaId) {
  const { $debounce, $axios  } = useContext()
  const inputAsesorValues = ref([])
  const inputAsesorOnSearch = (search, loading) => {
    loading(true)
    searchData(search, loading)
  }

  const searchData = $debounce((search, loading) => {
    $axios({
      method: 'GET',
      url: `/admin/schemas/${schemaId}/assessors`,
      params: {
        filters: {
          search
        }
      }
    }).then((res) => {
      try {
        inputAsesorValues.value = res.data.data
      } catch (error) {
      }
      loading(false)
    })
  }, 350)

  return { inputAsesorValues, inputAsesorOnSearch }
}

function useStatusChange (input, cachedRequestSchema, crud, close) {
  const { $swal, $overlayLoading } = useContext()

  const accept = async () => {
      $overlayLoading.show()
      const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
      const data = {
        note: input.note,
        status: input.status || 'Approved',
        assessor: input.assessor,
        schedule: input.schedule,
        room: input.place,
      }
      try {
        const http = await crud.update(ids, data, 'Yakin ingin menyetujui permohonan ini?')
        $overlayLoading.hide()
        if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
          await $swal({
            title: 'Warning',
            text: `Data dengan id "${([...http.data.data].join(', '))}" gagal disetujui.`,
            type: 'warning',
          })
        }
        close()
      } catch (error) {
        $overlayLoading.hide()
      }
  }
  const cancelApproved = async () => {
    $overlayLoading.show()
    const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
    const data = {
      status: 'Pending'
    }
    try {
      const http = await crud.update(ids, data, 'Yakin ingin membatalkan permohonan ini? Semua progres user ini akan terhapus semuanya!')
      $overlayLoading.hide()
      if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
        $swal({
          title: 'Warning',
          text: `Data dengan id "${([...http.data.data].join(', '))}" gagal dibatalkan penyetujuannya.`,
          type: 'warning',
        }).then(() => close())
      }
      close()
    } catch (error) {
      $overlayLoading.hide()
    }
  }
  const reject = async () => {
    $overlayLoading.show()
    const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
    const data = {
      note: input.note,
      status: input.status || 'Rejected'
    }
    try {
      const http = await crud.update(ids, data, 'Yakin ingin menolak permohonan ini?')
      $overlayLoading.hide()
      if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
        $swal({
          title: 'Warning',
          text: `Data dengan id "${([...http.data.data].join(', '))}" gagal di tolak.`,
          type: 'warning',
        }).then(() => close())
      }
      close()
    } catch (error) {
      $overlayLoading.hide()
    }
  }
  const cancelRejected = async () => {
    $overlayLoading.show()
    const ids = ([...cachedRequestSchema.value].map(r => r.id)).join(',')
    const data = {
      status: 'Pending'
    }
    try {
      const http = await crud.update(ids, data, 'Yakin ingin membatalkan penolakan ini?')
      $overlayLoading.hide()
      if ([...http.data.data].length !== [...cachedRequestSchema.value].length) {
        $swal({
          title: 'Warning',
          text: `Data dengan id "${([...http.data.data].join(', '))}" gagal dibatalkan penolakannya.`,
          type: 'warning',
        }).then(() => close())
      }
      close()
    } catch (error) {
      $overlayLoading.hide()
    }
  }

  return {
    accept,
    cancelApproved,
    reject,
    cancelRejected
  }
}
</script>

