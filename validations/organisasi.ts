import * as yup from 'yup';

const jabatanSchema = yup.object().shape({
  jabatan: yup
    .string()
    .required('Jabatan tidak boleh kosong')
    .matches(/^[a-zA-Z ]*$/, 'Jabatan harus berupa huruf')
    .typeError('Jabatan tidak boleh kosong'),
});

const strukturSchema = yup.object().shape({
  nik: yup.number().required('NIK tidak boleh kosong').integer('NIK harus valid').typeError('NIK harus valid'),
  nip: yup.number().required('NIP tidak boleh kosong').integer('NIP harus valid').typeError('NIP harus valid'),
  name: yup
    .string()
    .required('Nama tidak boleh kosong')
    .matches(/^[a-zA-Z ]*$/, 'Nama harus berupa huruf')
    .typeError('Nama tidak boleh kosong'),
  alamat: yup.string().required('Alamat tidak boleh kosong').typeError('Alamat tidak boleh kosong'),
  phone: yup
    .number()
    .required('Nomor telepon tidak boleh kosong')
    .integer('Nomor telepon harus valid')
    .typeError('Nomor telepon harus valid'),
  jabatan_id: yup.string().required('Jabatan tidak boleh kosong').typeError('Jabatan harus valid'),
  status: yup
    .number()
    .required('Status tidak boleh kosong')
    .integer('Status harus valid')
    .typeError('Status harus valid'),
});

export const validateJabatan = async (data: any) => {
  try {
    await jabatanSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
};

export const validateStruktur = async (data: any) => {
  try {
    await strukturSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
};
