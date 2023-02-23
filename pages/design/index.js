import Link from 'next/link';
import { useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Badge from '@components/systems/Badge';
import Button from '@components/systems/Button';
import Card from '@components/systems/Card';
import Checkbox from '@components/systems/Checkbox';
import Container from '@components/systems/Container';
import Dropdown from '@components/systems/Dropdown';
import Heading from '@components/systems/Heading';
import Input from '@components/systems/Input';
import Label from '@components/systems/Label';
import LabeledInput from '@components/systems/LabeledInput';
import LinkButton from '@components/systems/LinkButton';
import MultipleSelect from '@components/systems/MultipleSelect';
import Progress from '@components/systems/Progress';
import Radio from '@components/systems/Radio';
import Wrapper from '@components/systems/Wrapper';
import Shimer from '@components/systems/Shimer';
import Table from '@components/systems/Table';
import Tag from '@components/systems/Tag';
import Text from '@components/systems/Text';
import Title from '@components/systems/Title';
import Section from '@components/systems/Section';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import Tabs from '@components/systems/Tabs';
import Dialog from '@components/systems/Dialog';
import SearchBox from '@components/systems/SearchBox';
import ReactTable from '@components/systems/ReactTable';
import { tabledata } from '@utils/tableData';

const searchBoxData = [
  {
    id: 1,
    name: 'Option 1',
  },
  {
    id: 2,
    name: 'Option 2',
  },
  {
    id: 3,
    name: 'Option 3',
  },
];

export default function Example() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDangerDialog, setOpenDangerDialog] = useState(false);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);
  const [popOver, setPopOver] = useState({ show: false, value: null });
  const { updateToast, pushToast, dismissToast } = useToast();
  const [user, setUser] = useState({
    username: '',
    email: '',
    angka: '',
    angka_positif: '',
  });

  const handleShowMultiSelect = () => {
    setShowMultiSelect(!showMultiSelect);
  };

  const handleMultiSelect = (e) => {
    if (!multiSelect.includes(e.currentTarget.value)) {
      setMultiSelect([...multiSelect, e.currentTarget.value]);
    }
    setShowMultiSelect(false);
  };

  const multiSelectPopItem = (e) => {
    // prevent clickable parent get clicked
    e.stopPropagation();
    setMultiSelect(multiSelect.filter((p, i) => i !== parseInt(e.currentTarget.getAttribute('value'))));
  };

  const handleDropdownShow = () => {
    setPopOver({ ...popOver, show: !popOver.show });
  };

  const handleValueDropdown = (e) => {
    setPopOver({ show: false, value: e.currentTarget.getAttribute('value') });
  };

  const addToast = () => {
    pushToast({ message: 'This is a toast message', isError: false });
  };

  const addToastError = () => {
    pushToast({ message: 'This is a toast message', isError: true });
  };

  const toastAsync = () => {
    const toastId = pushToast({
      message: 'Loading Posting Data',
      isLoading: true,
    });
    setTimeout(() => {
      updateToast({ toastId, message: 'Posting Data Success', isError: false });
    }, 3000);
  };

  let userSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username harus diisi')
      .matches(/^[A-Za-z]+$/, 'Username harus berupa huruf'),
    email: yup.string().email('Email harus valid').required('Email harus diisi').typeError('Email harus validwetewt'),
    angka: yup
      .number()
      .required('Angka harus diisi')
      .integer('Angka harus berupa integer bukan float')
      .typeError('Angka harus valid'),
    angka_positif: yup
      .number()
      .required('Angka harus diisi')
      .positive('Angka harus positif')
      .integer('Angka harus berupa integer bukan float')
      .typeError('Angka harus valid'),
  });

  const checker = async (schema, param) => {
    try {
      await schema.validate(param, { abortEarly: false });
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: err.errors };
    }
  };

  const checkValid = async () => {
    try {
      const { valid, errors } = await checker(userSchema, user);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el) => {
          pushToast({ message: el, isError: true });
        });
      }
      console.log(valid);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onNext = () => {};

  const onPrev = () => {};

  const [selectedSearchBox, setSelectedSearchBox] = useState();
  const [querySearchBox, setQuerySearchBox] = useState('');
  const filteredSearchBox =
    querySearchBox === ''
      ? searchBoxData
      : searchBoxData.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySearchBox.toLowerCase().replace(/\s+/g, ''))
        );

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`#`} className='text-sm font-medium text-emerald-500 hover:text-emerald-600'>
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`#`}
                className='mr-2 rounded bg-sky-600 py-[3px] px-[6px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!py-[2px] !px-[6px]'
                // onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
        width: 200,
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  return (
    <Layout title='Design System - MyMusic'>
      <Title>Example</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-emerald-600 dark:text-emerald-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link href='#validation'>Validation (yup)</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#dialog'>Dialog</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#searchbox'>SearchBox</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#reacttable'>React Table</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#usetoast'>useToast (hook)</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#badge'>Badge</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#button'>Button</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#linkbutton'>LinkButton</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#checkbox'>Checkbox</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#container'>Container</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#dropdown'>Dropdown</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#dropdownitem'>Dropdown.item</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#heading'>Heading</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#input'>Input</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#inputdisabled'>Input.disabled</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#label'>Label</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#labeledinput'>LabeledInput</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#labeledinputdisabled'>LabeledInput.disabled</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#multipleselect'>MultipleSelect</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#multipleselect.item'>MultipleSelect.item</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#progress'>Progress</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#radio'>Radio</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#shimer'>Shimer</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabs'>Tabs</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabspanel'>Tabs.panel</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#table'>Table</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabletr'>Table.tr</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabletd'>Table.td</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#text'>Text</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#card'>Card</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#section'>Section</Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='validation' name='Validation' noChildren noClassName noProps>
        <LabeledInput
          label='Username'
          name='username'
          value={user.username}
          placeholder='Username'
          onChange={handleUserChange}
        />
        <LabeledInput label='Email' name='email' value={user.email} placeholder='Email' onChange={handleUserChange} />
        <LabeledInput label='Angka' name='angka' value={user.angka} placeholder='Angka' onChange={handleUserChange} />
        <LabeledInput
          label='Angka Positif'
          name='angka_positif'
          value={user.angka_positif}
          placeholder='Number Positif'
          onChange={handleUserChange}
        />
        <Button onClick={checkValid}>Submit</Button>
      </Wrapper>

      <Wrapper
        id='dialog'
        name='Dialog'
        noClassName
        noProps
        props={['open', 'setOpen', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
        <br />
        <br />

        <Dialog
          title='Confirmation'
          open={openDialog}
          showIcon
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => setOpenDialog(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Dialog>

        <Button.danger onClick={() => setOpenDangerDialog(true)}>Open Danger Dialog</Button.danger>

        <Dialog
          title='Delete Confirmation'
          open={openDangerDialog}
          showIcon
          isDanger
          setOpen={setOpenDangerDialog}
          onClose={() => setOpenDangerDialog(false)}
          onConfirm={() => setOpenDangerDialog(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Dialog>
      </Wrapper>

      <Wrapper
        id='searchbox'
        name='SearchBox'
        noClassName
        noProps
        noChildren
        props={['label', 'value', 'placeholder', 'onChange', 'query', 'onChangeQuery', 'afterLeave', 'filtered']}
      >
        <SearchBox
          label='Search Box'
          value={selectedSearchBox}
          placeholder='Search or Select'
          onChange={setSelectedSearchBox}
          onChangeQuery={(e) => setQuerySearchBox(e.target.value)}
          afterLeave={() => setQuerySearchBox('')}
          filtered={filteredSearchBox}
          query={querySearchBox}
        />
      </Wrapper>

      <Wrapper id='reacttable' name='React Table' props={['columns', 'data', 'page_size', 'bordered']} noProps noWrap>
        <LabeledInput
          label='Search Data'
          id='caridata'
          name='caridata'
          placeholder='Keyword'
          className='max-w-xs !py-2'
          onChange={(e) => {
            tableInstance.current.setGlobalFilter(e.target.value);
          }}
        />
        <ReactTable columns={column} data={tabledata} ref={tableInstance} page_size={5} />
      </Wrapper>

      <Wrapper id='usetoast' name='useToast (hook)' noProps noChildren noClassName>
        <code className='dark:text-white'>
          {`// pushToast({message, isError})`}
          <br />
          {`// in case you want to push new toast`}
          <br />
          <br />
          {`// updateToast({id, message, isError})`}
          <br />
          {`// in case you want to update toast`}
          <br />
          <br />
          {`// dismissToast()`}
          <br />
          {`// in case you want to dismiss all toast`}
          <br />
          {`// look validation for example`}
          <br />
          <br />
          {`import useToast from '@utils/useToast()'`}
          <br />
          <br />
          {`const { updateToast, pushToast, dismissToast } = useToast();`}
          <br />
          <br />
          {`const addToast = () => {`}
          <br />
          &nbsp;&nbsp;
          {`pushToast({ message: "This is a toast message", isError: false });`}
          <br />
          {`};`}
          <br />
          <br />
          {`const addToastError = () => {`}
          <br />
          &nbsp;&nbsp;
          {`pushToast({ message: "This is a toast message", isError: true });`}
          {`};`}
          <br />
          <br />
          {`const toastAsync = () => {`}
          <br />
          &nbsp;&nbsp;{`const toastId = pushToast({`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {`message: "Loading Posting Data",`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{`isLoading: true,`}
          <br />
          &nbsp;&nbsp;{`});`}
          <br />
          &nbsp;&nbsp;{`setTimeout(() => {`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {`updateToast({ toastId, message: "Posting Data Success", isError: false });`}
          <br />
          &nbsp;&nbsp;{`}, 3000);`}
          <br />
          {`};`}
        </code>
      </Wrapper>

      <div className='flex flex-wrap items-center gap-2'>
        <Button onClick={addToast}>Show Me Toast</Button>
        <Button onClick={addToastError}>Show Me Error Toast</Button>
        <Button onClick={toastAsync}>Toast with async</Button>
      </div>

      <Wrapper
        id='badge'
        name='Badge'
        variant={['dark', 'red', 'green', 'yellow', 'indigo', 'pink']}
        props={['isLarge']}
      >
        <div className='flex flex-wrap items-center gap-y-2'>
          <Badge>blue</Badge>
          <Badge.dark>dark</Badge.dark>
          <Badge.red>red</Badge.red>
          <Badge.green>green</Badge.green>
          <Badge.yellow>yellow</Badge.yellow>
          <Badge.indigo>indigo</Badge.indigo>
          <Badge.purple>purple</Badge.purple>
          <Badge.pink>pink</Badge.pink>
        </div>
        <br />
        <br />
        <div className='flex flex-wrap items-center gap-y-2'>
          <Badge isLarge>blue</Badge>
          <Badge.dark isLarge>dark</Badge.dark>
          <Badge.red isLarge>red</Badge.red>
          <Badge.green isLarge>green</Badge.green>
          <Badge.yellow isLarge>yellow</Badge.yellow>
          <Badge.indigo isLarge>indigo</Badge.indigo>
          <Badge.purple isLarge>purple</Badge.purple>
          <Badge.pink isLarge>pink</Badge.pink>
        </div>
      </Wrapper>

      <Wrapper
        id='button'
        name='Button'
        variant={['success', 'danger', 'secondary', 'tertary']}
        props={['type', 'value', 'disabled', 'onClick']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button>Primary</Button>
          <Button.success>Success</Button.success>
          <Button.danger className='flex items-center gap-2'>
            <ArrowSmRightIcon className='h-4 w-4' />
            Danger
          </Button.danger>
          <Button.secondary>Secondary</Button.secondary>
          <Button.tertary>Tertary</Button.tertary>
        </div>
      </Wrapper>

      <Wrapper id='linkbutton' name='LinkButton' variant={['secondary', 'tertary']} props={['href']}>
        <div className='flex flex-wrap items-center gap-2'>
          <LinkButton href='/' className='flex items-center gap-2'>
            <ArrowSmRightIcon className='h-5 w-5' />
            TambahLink to some page
          </LinkButton>
          <LinkButton.secondary href='/'>Link to some page</LinkButton.secondary>
          <LinkButton.tertary href='/'>Link to some page</LinkButton.tertary>
        </div>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        variant={['disabled']}
        props={['name', 'label', 'value', 'onChange', 'defaultChecked']}
        noClassName
        noChildren
      >
        <Checkbox name='checkbox 1' label='Checkbox' />
        <Checkbox.disabled name='Disabled Checkbox' />
        <Checkbox.disabled name='Disabled Checked Checkbox' defaultChecked />
      </Wrapper>

      <Wrapper id='container' name='Container' props={['small']}>
        <Container>
          <Text>Content</Text>
        </Container>
      </Wrapper>

      <Wrapper id='dropdown' name='Dropdown' props={['id', 'name', 'label', 'show', 'value', 'onClick', 'onBlur']}>
        <Dropdown
          label='Dropdown'
          show={popOver.show}
          value={popOver.value ?? 'Pilih Salah Satu'}
          onBlur={handleDropdownShow}
          onClick={handleDropdownShow}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
            return (
              <Dropdown.item key={i} value={`Item ${i}`} onClick={handleValueDropdown}>
                Item {i}
              </Dropdown.item>
            );
          })}
        </Dropdown>
      </Wrapper>

      <Wrapper id='dropdownitem' name='Dropdown.item' noClassName noWrap />

      <Wrapper id='heading' name='Heading' props={['h1', 'h2', 'h3']}>
        <Heading h1>Heading 1</Heading>
        <Heading h2>Heading 2</Heading>
        <Heading h3>Heading 3</Heading>
        <Heading>Heading 4 (default)</Heading>
      </Wrapper>

      <Wrapper id='input' name='Input' props={['type', 'name', 'placeholder', 'value', 'onChange']}>
        <Input name='input' placeholder='Input default' />
      </Wrapper>

      <Wrapper id='inputdisabled' name='Input.disabled' props={['type', 'name', 'placeholder', 'defaultValue']}>
        <Input.disabled name='input' placeholder='Input default' defaultValue='Has a value' />
      </Wrapper>

      <Wrapper id='label' name='Label'>
        <Label>Ut deserunt do est irure.</Label>
      </Wrapper>

      <Wrapper
        id='labeledinput'
        name='LabeledInput'
        props={['id', 'label', 'name', 'type', 'placeholder', 'value', 'onChange']}
      >
        <LabeledInput label='Email' name='email' placeholder='Email' type='text' />
        <LabeledInput label='Password' name='password' placeholder='Your Password' type='password' />
      </Wrapper>

      <Wrapper
        id='labeledinputdisabled'
        name='LabeledInput.disabled'
        props={['label', 'type', 'name', 'placeholder', 'defaultValue']}
      >
        <LabeledInput.disabled
          label='Confirmation Password'
          name='confirmation'
          placeholder='confirmation'
          type='password'
        />
      </Wrapper>

      <Wrapper
        id='multipleselect'
        name='MultipleSelect'
        props={['label', 'show', 'value', 'onClick', 'onBlur']}
        noClassName
        noProps
      >
        <MultipleSelect
          label='Multiple Select'
          onClick={handleShowMultiSelect}
          onBlur={handleShowMultiSelect}
          show={showMultiSelect}
          value={multiSelect.map((p, i) => (
            <Tag key={i} value={i} onClick={multiSelectPopItem}>
              {p}
            </Tag>
          ))}
        >
          <MultipleSelect.item value='Option 1' onClick={handleMultiSelect}>
            <Tag noX>Option 1</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 2' onClick={handleMultiSelect}>
            <Tag noX>Option 2</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 3' onClick={handleMultiSelect}>
            <Tag noX>Option 3</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 4' onClick={handleMultiSelect}>
            <Tag noX>Option 4</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 5' onClick={handleMultiSelect}>
            <Tag noX>Option 5</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 6' onClick={handleMultiSelect}>
            <Tag noX>Option 6</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 7' onClick={handleMultiSelect}>
            <Tag noX>Option 7</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 8' onClick={handleMultiSelect}>
            <Tag noX>Option 8</Tag>
          </MultipleSelect.item>
          <MultipleSelect.item value='Option 9' onClick={handleMultiSelect}>
            <Tag noX>Option 9</Tag>
          </MultipleSelect.item>
        </MultipleSelect>
      </Wrapper>

      <Wrapper id='multipleselectitem' name='MultipleSelect.item' noClassName noWrap />

      <Wrapper id='progress' name='Progress' variant={['percentage']} props={['percent']} noChildren noProps>
        <Progress percent={45} />
        <br />
        <Progress.percentage percent={0} />
        <br />
        <Progress.percentage percent={75} />
      </Wrapper>

      <Wrapper
        id='radio'
        name='Radio'
        variant={['disabled']}
        props={['name', 'label', 'value', 'onChange', 'checked']}
        noClassName
        noChildren
      >
        <Radio name='radio' label='Radio' />
        <Radio name='radio' label='Disabled Radio' />
        <Radio name='radio' label='Disabled Checked Radio' defaultChecked />
      </Wrapper>

      <Wrapper id='shimer' name='Shimer' noChildren noProps>
        <Shimer className='max-w-[5rem]' />
        <Shimer className='max-w-[10rem]' />
        <Shimer className='max-w-[15rem]' />
      </Wrapper>

      <Wrapper id='tabs' name='Tabs' props={['items']}>
        <Tabs items={['Tab A', 'Tab B', 'Tab C']}>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content A</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content B</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content C</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper id='tabitem' name='Tabs.panel' noProps>
        <Tabs items={['Tab']}>
          <Tabs.panel>
            <Heading className='mb-0'>Tabs Panel</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper
        id='table'
        name='Table'
        props={['head', 'totalPage', 'totalData', 'currentPage', 'next', 'prev']}
        noProps
        noWrap
      >
        <Table
          totalPage={5}
          totalData={50}
          currentPage={1}
          next={onNext}
          prev={onPrev}
          head={
            <>
              <Table.td shrink>No</Table.td>
              <Table.td>Column 1</Table.td>
              <Table.td>Column 2</Table.td>
              <Table.td>Column 3</Table.td>
              <Table.td>Column 4</Table.td>
              <Table.td>Column 5</Table.td>
              <Table.td>Column 6</Table.td>
              <Table.td>Column 7</Table.td>
              <Table.td>Column 8</Table.td>
            </>
          }
        >
          {[0, 1, 2, 3, 4].map((e, index) => {
            return (
              <Table.tr key={index}>
                <Table.td shrink>{index + 1}</Table.td>
                <Table.td>
                  <Badge>badge</Badge>
                </Table.td>
                <Table.td>
                  <Badge.red>badge red</Badge.red>
                </Table.td>
                <Table.td>
                  <Badge.dark>badge dark</Badge.dark>
                </Table.td>
                <Table.td>
                  <Badge.green>badge green</Badge.green>
                </Table.td>
                <Table.td>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </Table.td>
                <Table.td>
                  <Badge.indigo>badge indigo</Badge.indigo>
                </Table.td>
                <Table.td>
                  <Badge.purple>badge purple</Badge.purple>
                </Table.td>
                <Table.td>
                  <Badge.pink>badge pink</Badge.pink>
                </Table.td>
              </Table.tr>
            );
          })}
        </Table>
      </Wrapper>

      <Wrapper id='tabletr' name='Table.tr' noWrap />

      <Wrapper id='tabletd' name='Table.td' props={['shrink']} noWrap />

      <Wrapper id='text' name='Text' variant={['light', 'medium', 'semibold', 'bold', 'extrabold']}>
        <Text.light className='mb-2'>Light</Text.light>
        <Text className='mb-2'>Default</Text>
        <Text.medium className='mb-2'>Medium</Text.medium>
        <Text.semibold className='mb-2'>Semibold</Text.semibold>
        <Text.bold className='mb-2'>Bold</Text.bold>
        <Text.extrabold className='mb-2'>Extrabold</Text.extrabold>
      </Wrapper>

      <Wrapper id='card' name='Card' props>
        <Card>
          <Text>Card Content</Text>
        </Card>
      </Wrapper>

      <Wrapper id='section' name='Section' props variant={['small']}>
        <Section>
          <Text>Section Default</Text>
        </Section>
        <Section.small>
          <Text>Section Small</Text>
        </Section.small>
      </Wrapper>
    </Layout>
  );
}
