import React from "react";
import { Field, reduxForm } from "redux-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import _map from "lodash/map";
import { Typography } from "@material-ui/core";

import Notification from "./Common/form/Notification";
import InputField from "./Common/form/InputField";
import RadioGroup from "./Common/form/RadioGroup";
import SelectField from "./Common/form/SelectField";
import CreatableSelectField from "./Common/form/CreatableSelectField";
import GoogleSelectField from "./Common/form/GoogleSelectField";
import ToggleField from "./Common/form/ToggleField";
import DateField from "./Common/form/DateField";
import DateTimeField from "./Common/form/DateTimeField";
import CheckBox from "./Common/form/CheckBox";
import TimeField from "./Common/form/TimeField";
import TextEditor from "./Common/form/TextEditor";
import ColorField from "./Common/form/ColorField";
import DropzoneArea from "./Common/form/DropzoneArea";
import ActionBar from "./Common/form/ActionBar";
import ContactInputField from "./Common/form/ContactInputField";

function HeaderPage() {
  const hobbiesList = [
    { label: "Reading Books", value: "Reading Books" },
    { label: "Listening music", value: "Listening music" },
    { label: "Playing Cricket", value: "Playing Cricket" },
    { label: "Watching Tv", value: "Watching Tv" }
  ];

  const displayButton = [
    {
      type: "success",
      msg: "This is a success message!",
      bg: "green"
    },
    {
      type: "error",
      msg: "This is an error message!",
      bg: "red"
    },
    {
      type: "info",
      msg: "This is an information message!",
      bg: "blue"
    },
    {
      type: "warning",
      msg: "This is a warning message!",
      bg: "orange"
    }
  ];
  return (
    <>
      <div className="innerBox">
        <div className="dropzone_area">
          <DropzoneArea accept=".png,.jpg,.gif" multipleUpload={false} />
        </div>
        <div className="d-flex">
          <div className="col-md-3 textStart">
            <h4>Name :</h4>
          </div>
          <div className="col-md-4 leftSpace">
            <Field
              placeholder="First Name"
              label="First Name"
              name="fName"
              component={InputField}
              tooltipText={"First Name"}
            />
          </div>

          <div className="col-md-4 leftSpace">
            <Field
              placeholder="Last Name"
              label="Last Name"
              name="lName"
              component={InputField}
              tooltipText={"Last Name"}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-3 textStart">
            <h4>Gender :</h4>
          </div>
          <div className="col-md-2 leftSpace">
            <Field name="layout" component={RadioGroup}>
              <FormControlLabel
                value={"1"}
                control={<Radio color="primary" />}
                label={"Male"}
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="primary" />}
                label={"Female"}
              />
            </Field>
          </div>
        </div>
        <div className="d-flex mt">
          <div className="col-md-3 textStart">
            <h4>Date Picker:</h4>
          </div>
          <div className="col-md-6 leftSpace">
            <Field
              placeholder="Birth Date"
              label="Birth Date"
              name="birthDate"
              component={DateField}
              tooltipText="Date Picker"
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-3 textStart">
            <h4>Date and Time picker:</h4>
          </div>
          <div className="leftSpace topSpace">
            <Field
              placeholder="Birth Date"
              label="Birth Date"
              name="birthDate"
              component={DateTimeField}
              tooltipText="Date and Time Picker"
            />
            <div>
              <Typography variant="caption">
                Use <b> YYYY/MM/DD hh:mm a</b> format
              </Typography>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-3 textStart">
            <h4>Time Picker:</h4>
          </div>
          <div className="leftSpace topSpace">
            <Field
              name="timeStart"
              placeholder="SelectTime"
              label="time"
              component={TimeField}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-3 textStart">
            <h4>Hobbies:</h4>
          </div>
          <div className="col-md-7 topSpace leftSpace textStart">
            {_map(hobbiesList, (check, key) => (
              <div key={key}>
                <Field
                  name={check.value}
                  component={CheckBox}
                  label={check.label}
                  tooltipText={check.value}
                />
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
              placeholder={"Select color"}
              label={"Select color"}
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
              label={"Phone number"}
              country={"+1"}
            />
          </div>
        </div>
        <div className="d-flex mt">
          <div className="col-md-3 textStart">
            <h4>Select :</h4>
          </div>
          <div className="col-md-3 leftSpace">
            <Field
              name="select"
              placeholder="Select One"
              component={SelectField}
              dataSource={[
                { label: "BE", value: "BE" },
                { label: "ME", value: "ME" },
                { label: "MBA", value: "MBA" }
              ]}
              tooltipText={"select"}
              label="Select"
            />
          </div>
        </div>
        <div className="d-flex mt">
          <div className="col-md-3 textStart">
            <h4>Creatable Select :</h4>
          </div>
          <div className="col-md-3 leftSpace">
            <Field
              name="CreatableSelect"
              label="Creatable select"
              placeholder={"Select One"}
              component={CreatableSelectField}
              dataSource={[
                { label: "BE", value: "BE" },
                { label: "ME", value: "ME" },
                { label: "MBA", value: "MBA" }
              ]}
              tooltipText={"CreatableSelect"}
            />
          </div>
        </div>
        <div className="d-flex mt">
          <div className="col-md-3 textStart">
            <h4>Multi Select :</h4>
          </div>
          <div className="col-md-5 leftSpace">
            <Field
              name="muilti"
              placeholder={"Select One"}
              component={CreatableSelectField}
              label="Multi select"
              dataSource={[
                { label: "BE", value: "BE" },
                { label: "ME", value: "ME" },
                { label: "MBA", value: "MBA" }
              ]}
              isMulti
              tooltipText={"muilti select"}
            />
          </div>
        </div>
        <div className="d-flex mt">
          <div className="col-md-3 textStart">
            <h4>Google Select :</h4>
          </div>
          <div className="col-md-5 leftSpace">
            <Field
              name="address"
              component={GoogleSelectField}
              placeholder="Select One"
              tooltipText={"Google select"}
              label="Googel Select"
            />
          </div>
        </div>
        <div className="d-flex mt">
          <Field
            name="toogle"
            component={ToggleField}
            label={"Are you Married? "}
            tooltipText={"Are you Married?"}
          />
        </div>
        <div style={{ textAlign: "start" }}>
          <h4>Notes :</h4>
        </div>
        <div className="row form-row">
          <div className="col-md-11 leftSpace">
            <TextEditor
              editorVal=""
              placeholder="Notes..."
              onEditorContentChange={() => {}}
            />
          </div>
          <div className="col-md-11 topSpace bottomSpace leftSpace">
            <TextEditor
              isSlimEditor
              editorVal=""
              placeholder="Notes..."
              onEditorContentChange={() => {}}
            />
          </div>
        </div>
        <Notification commonData={displayButton} />
        <ActionBar
          primaryButtonProps={{
            label: "Save"
          }}
          cancelBtnProps
        />
      </div>

      <div className="outerBox rightSpace leftSpace">
        <DropzoneArea multipleUpload={true} />
      </div>
    </>
  );
}

export default reduxForm({
  form: "headerPage"
})(HeaderPage);
