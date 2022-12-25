import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  GlobalOutlined,
  HeartFilled,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { UserList } from "../../action/UserList";
import "./home.css";
import { Button, Modal } from "antd";
import { Input } from "antd";



export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserList());
  }, [0]);

  const data = useSelector((state) => state?.userList?.data?.data);

  useEffect(() => {
    setuserdatares(data);
  }, [data]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userdatares, setuserdatares] = React.useState();

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const [filter_data, setfilter_data] = React.useState();

  const handleClickOpen = (id) => {
    const filter_data_res =
      userdatares && userdatares.filter((res) => res.id === id);
    setfilter_data(filter_data_res);
    setuserData({
      name: filter_data_res && filter_data_res[0].name,
      email: filter_data_res && filter_data_res[0].email,
      phone: filter_data_res && filter_data_res[0].phone,
      website: filter_data_res && filter_data_res[0].website,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickDelete = (id) => {
    const deleteData =
      userdatares && userdatares.filter((res) => res.id !== id);
    setuserdatares(deleteData);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phone) {
      errors.phone = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.website) {
      errors.website = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
    },
    validate,
    onSubmit: (values) => {
      filter_data[0].email = values.email;
      filter_data[0].name = values.name;
      filter_data[0].phone = values.phone;
      filter_data[0].website = values.website;
      setIsModalOpen(false);
    },
  });

  return (
    <div className="home">
      {userdatares &&
        userdatares?.length > 0 &&
        userdatares?.map(({ username, name, email, phone, website, id }, i) => (
          <div className="box">
            <Card
              style={{ margin: "15px" }}
              cover={
                <img
                  className="avtarImg"
                  key={i}
                  alt="example"
                  src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
                />
              }
              actions={[
                <HeartFilled key="like" style={{ fontSize: "20px" }} />,
                <EditOutlined key="edit" onClick={() => handleClickOpen(id)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleClickDelete(id)}
                />,
              ]}
            >
              <div className="profile-card-body">
                <ul className="status">
                  <li>
                    <h3 key={i}>{name}</h3>
                  </li>
                  <li>
                    <MailOutlined style={{ fontSize: "18px" }} />
                    <span className="status-text" key={i}>
                      {email}
                    </span>
                  </li>

                  <li>
                    <PhoneOutlined style={{ fontSize: "18px" }} />
                    <span className="status-text" key={i}>
                      {phone}
                    </span>
                  </li>

                  <li>
                    <GlobalOutlined style={{ fontSize: "18px" }} />
                    <span className="status-text" key={i}>
                      {website}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            <Modal
              title="User Details"
              open={isModalOpen}
              onCancel={handleCancel}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="inputdiv">
                  <label htmlFor="name">Name :</label>
                  <div className="inputText">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>

                <div className="inputdiv">
                  <label htmlFor="email">Email :</label>
                  <div className="inputText">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="inputdiv">
                  <label htmlFor="phone">Phone :</label>
                  <div className="inputText">
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone ? (
                      <div className="error">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <div className="inputdiv">
                  <label htmlFor="website">Web Site :</label>
                  <div className="inputText">
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.website}
                    />
                    {formik.errors.website ? (
                      <div className="error">{formik.errors.website}</div>
                    ) : null}
                  </div>
                </div>

                <div className="footerButton">
                  <Button type="primary" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                  <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Modal>
          </div>
        ))}
    </div>
  );
}
