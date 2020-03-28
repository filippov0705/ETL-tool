import React, { useState } from "react";

import useAutocomplete from "@material-ui/lab/useAutocomplete";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  wrapper: {
    width: "100%",
    marginTop: 10
  },
  label: {
    position: "absolute",
    top: -18,
    left: 8,
    fontSize: 13,
    backgroundColor: "white",
    padding: 8,
    color: "rgba(0, 0, 0, 0.54)"
  },
  inputWrapper: {
    border: "1px solid #d9d9d9"
  }
});

const InputWrapper = styled("div")`
  width: 100%;
  margin: 10px 0;

  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  &:hover {
    border-color: #40a9ff;
  }

  & input {
    font-size: 14px;
    line-height: 26px;
    padding: 2px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    outline: 0;
    background-color: white;
  }
`;

const Tag = styled(
  ({ isDisabled, deleteUserRole, label, onDelete, ...props }) => {
    const deleteTag = () => {
      onDelete();
      deleteUserRole(label);
    };

    return (
      <div {...props}>
        <span>{label}</span>
        {isDisabled ? null : <CloseIcon onClick={deleteTag} />}
      </div>
    );
  }
)`
  display: flex;
  align-items: center;
  height: 34px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  outline: 0;
  overflow: hidden;
  position: relative;
  padding: 0 10px;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    margin-left: 5px;
  }
`;

const Listbox = styled("ul")`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

const ChipInputField = props => {
  const { classes } = props;
  const roleTypes = props.rolesTypes.filter(item => !props.role.includes(item));
  const [roles, setRoles] = useState(roleTypes);
  const [userRole, setUserRole] = useState(props.role);

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    setAnchorEl
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: roles,
    value: userRole,
    getOptionLabel: option => option
  });

  const addUserRole = tag => {
    setRoles(roles.filter(item => item !== tag));
    props.addRole(props.id, tag);
    setUserRole([...userRole, tag]);
  };

  const deleteUserRole = tag => {
    setRoles([...roles, tag]);
    props.deleteRole(props.id, tag);
    setUserRole(userRole.filter(item => item !== tag));
  };

  return (
    <div className={classes.wrapper}>
      <div {...getRootProps()}>
        <InputWrapper
          ref={setAnchorEl}
          className={props.isDisabled ? "" : classes.inputWrapper}
        >
          <span className={classes.label}>Roles</span>
          {value.map((option, index) => (
            <Tag
              deleteUserRole={deleteUserRole}
              isDisabled={props.isDisabled}
              label={option}
              {...getTagProps({ index })}
            />
          ))}

          <input disabled={props.isDisabled} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const tagOption = option;
            return (
              <li {...getOptionProps({ option, index })}>
                <span onClick={() => addUserRole(tagOption)}>{option}</span>
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </div>
  );
};

export default withStyles(styles)(ChipInputField);
