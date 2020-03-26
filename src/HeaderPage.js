import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import _map from 'lodash/map';
import { Typography } from '@material-ui/core';

import Notification from './Common/form/Notification';
import InputField from './Common/form/InputField';
import RadioGroup from './Common/form/RadioGroup';
import SelectField from './Common/form/SelectField';
import CreatableSelectField from './Common/form/CreatableSelectField';
import GoogleSelectField from './Common/form/GoogleSelectField';
import ToggleField from './Common/form/ToggleField';
import DateField from './Common/form/DateField';
import DateTimeField from './Common/form/DateTimeField';
import CheckBox from './Common/form/CheckBox';
import TimeField from './Common/form/TimeField';
import TextEditor from './Common/form/TextEditor';
import ColorField from './Common/form/ColorField';
import DropzoneArea from './Common/form/DropzoneArea';
import ActionBar from './Common/form/ActionBar';
import ContactInputField from './Common/form/ContactInputField';

function HeaderPage() {
    const [notes, setNotes] = useState('');
    const [notes1, setNotesTwo] = useState('');
    const hobbiesList = [
        { label: 'Reading Books', value: '1' },
        { label: 'Listening music', value: '2' },
        { label: 'Playing Cricket', value: '3' },
        { label: 'Watching Tv', value: '4' }
    ];

    const displayButton = [
        {
            type: 'success',
            msg: 'This is a success message!',
            bg: 'green'
        },
        {
            type: 'error',
            msg: 'This is an error message!',
            bg: 'red'
        },
        {
            type: 'info',
            msg: 'This is an information message!',
            bg: 'blue'
        },
        {
            type: 'warning',
            msg: 'This is a warning message!',
            bg: 'orange'
        }
    ];
    return (
        <>
            <div className="innerBox">
                <div className="dropzone_area">
                    <DropzoneArea
                        isImageUpload
                        parent={this}
                        type="uploadedImg"
                        singleUpload={true}
                        accept=".png,.jpg,.gif"
                    />
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Name :</h4>
                    </div>
                    <div className="col-md-4 leftSpace">
                        <Field placeholder="First Name" label="First Name" name="fName" component={InputField} />
                    </div>

                    <div className="col-md-4 leftSpace">
                        <Field placeholder="Last Name" label="Last Name" name="lName" component={InputField} />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Gender :</h4>
                    </div>
                    <div className="col-md-2 leftSpace">
                        <Field name="layout" component={RadioGroup}>
                            <FormControlLabel value={'1'} control={<Radio color="primary" />} label={'Male'} />
                            <FormControlLabel value={'2'} control={<Radio color="primary" />} label={'Female'} />
                        </Field>
                    </div>
                </div>

                <div className="d-flex">
                    <Field name="taxFree" component={ToggleField} label={'Are you Married?'} />
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Date Picker:</h4>
                    </div>
                    <div className="col-md-6 leftSpace">
                        <Field placeholder="Birth Date" label="Birth Date" name="birthDate" component={DateField} />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Date and Time picker:</h4>
                    </div>
                    <div className="leftSpace topSpace">
                        <Field placeholder="Birth Date" label="Birth Date" name="birthDate" component={DateTimeField} />
                    </div>
                </div>
                <div style={{ marginTop: '-10px' }}>
                    <Typography variant="caption">
                        Use <b> YYYY/MM/DD hh:mm a</b> format
                    </Typography>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Time Picker:</h4>
                    </div>
                    <div className="leftSpace topSpace">
                        <Field name="timeStart" placeholder="SelectTime" label="time" component={TimeField} />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Hobbies:</h4>
                    </div>
                    <div className="col-md-7 topSpace leftSpace textStart">
                        {_map(hobbiesList, (check, key) => (
                            <div key={key}>
                                <Field name={check.value} component={CheckBox} label={check.label} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Select Color :</h4>
                    </div>
                    <div className="leftSpace topSpace">
                        <Field
                            name="color"
                            component={ColorField}
                            placeholder={'Select color'}
                            label={'Select color'}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Contact Number :</h4>
                    </div>
                    <div className="leftSpace topSpace">
                        <Field
                            name="phone"
                            component={ContactInputField}
                            placeholder="Phone Number:"
                            label={'Phone number'}
                            country={'+1'}
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Select :</h4>
                    </div>
                    <div className="col-md-3 leftSpace">
                        <Field
                            name="select"
                            placeholder="Select One"
                            component={SelectField}
                            dataSource={[
                                { label: 'BE', value: 'BE' },
                                { label: 'ME', value: 'ME' },
                                { label: 'MBA', value: 'MBA' }
                            ]}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Creatable Select :</h4>
                    </div>
                    <div className="col-md-3 leftSpace">
                        <Field
                            name="CreatableSelect"
                            placeholder={'Select One'}
                            component={CreatableSelectField}
                            dataSource={[
                                { label: 'BE', value: 'BE' },
                                { label: 'ME', value: 'ME' },
                                { label: 'MBA', value: 'MBA' }
                            ]}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Multi Select :</h4>
                    </div>
                    <div className="col-md-5 leftSpace">
                        <Field
                            name="muilti"
                            placeholder={'Select One'}
                            component={CreatableSelectField}
                            dataSource={[
                                { label: 'BE', value: 'BE' },
                                { label: 'ME', value: 'ME' },
                                { label: 'MBA', value: 'MBA' }
                            ]}
                            isMulti
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className="col-md-3 textStart">
                        <h4>Google Select :</h4>
                    </div>
                    <div className="col-md-5 leftSpace">
                        <Field name="address" component={GoogleSelectField} placeholder="Select One" />
                    </div>
                </div>

                <div style={{ textAlign: 'start' }}>
                    <h4>Notes :</h4>
                </div>
                <div className="row form-row">
                    <div className="col-md-11">
                        <TextEditor
                            editorVal={notes}
                            placeholder="Notes..."
                            onEditorContentChange={header => setNotes(header)}
                        />
                    </div>
                    <div className="col-md-11 topSpace bottomSpace">
                        <TextEditor
                            isSlimEditor
                            editorVal={notes1}
                            placeholder="Notes..."
                            onEditorContentChange={header => setNotesTwo(header)}
                        />
                    </div>
                </div>
                <Notification commonData={displayButton} />
                <ActionBar
                    primaryButtonProps={{
                        label: 'Save'
                    }}
                    cancelBtnProps
                />
            </div>

            <div className="outerBox rightSpace leftSpace">
                <DropzoneArea isImageUpload uploadedImg type="uploadedImg" multipleUpload={true} />
            </div>
        </>
    );
}

export default reduxForm({
    form: 'headerPage'
})(HeaderPage);
