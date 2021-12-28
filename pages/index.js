import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Table,
  Form,
  Typography,
  Tag,
  Row,
  Col,
  Input,
  Space,
  Carousel,
  Statistic,
  Modal,
  Divider,
  Tabs,
  Button,
  message,
  Popconfirm,
  Spin,
} from "antd";
import styles from "../styles/Home.module.css";
import {
  HomeOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import img from "../public/vercel.svg";

// Destructures

const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const data = {
  get_Properties: [
    {
      _id: "1",
      misc: {
        _id: "1",
        landlord_name: "Kaguamba",
        contact: "0748920305",
        email: "kaguambz@gmail.com",
      },
      property_name: "Edith Apartments",
      price: 8000,
      description: "A comfy living space",
      location: "Opposite Lisah's ,  Gate C",
      amenities: "Wifi,DSTV,24hr security",
      vacancy: 0,
      main_image: "",
      reviews: [
        {
          content: "Nice crib",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
        {
          content: "Keja swafi",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
      ],
      caretaker1: "James",
      c1contact: "0723996233",
      caretaker2: null,
      c2contact: null,
      createdAt: Date.now().toString(),
      reviewed: false,
      revoked: false,
      author: {
        email: "edu@gmail.com",
        name: "Edwin",
      },
    },
    {
      _id: "2",
      misc: {
        _id: "2",
        landlord_name: "Aganya",
        contact: "074892567",
        email: "aganya@gmail.com",
      },
      property_name: "Faith Apartments",
      price: 7000,
      description: "A comfy living space",
      location: "Opposite Lisah's ,  Gate B",
      amenities: "Wifi,DSTV,24hr security",
      vacancy: 2,
      main_image: "",
      reviews: [
        {
          content: "Nice crib",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
        {
          content: "Keja swafi",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
      ],
      caretaker1: "James",
      c1contact: "0723996233",
      caretaker2: null,
      c2contact: null,
      createdAt: Date.now().toString(),
      reviewed: true,
      revoked: false,
      author: {
        email: "adrian@gmail.com",
        name: "Adrian",
      },
    },
    {
      _id: "3",
      misc: {
        _id: "2",
        landlord_name: "Aganya",
        contact: "0736373839",
        email: "aganya@gmail.com",
      },
      property_name: "Executive Apartments",
      price: 10000,
      description: "A comfy living space",
      location: "Opposite Lisah's ,  Gate C",
      amenities: "Wifi,DSTV,24hr security",
      vacancy: 2,
      main_image: "",
      reviews: [
        {
          content: "Nice crib",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
        {
          content: "Keja swafi",
          createdAt: Date.now().toString(),
          author: {
            email: "edu@gmail.com",
            name: "Edwin",
          },
        },
      ],
      caretaker1: "James",
      c1contact: "0723996233",
      caretaker2: null,
      c2contact: null,
      createdAt: Date.now().toString(),
      reviewed: true,
      revoked: false,
      author: {
        email: "edu@gmail.com",
        name: "Edwin",
      },
    },
  ],
  get_Users: [
    {
      name: "Edwin",
      email: "edu@gmail.com",
      picture: "",
      _id: "1",
    },
    {
      name: "Adrian",
      email: "adrian@gmail.com",
      picture: "",
      _id: "2",
    },
  ],
  get_Clients: [
    {
      _id: "1",
      landlord_name: "Kaguamba",
      contact: "0717722295",
      email: "kaguambz@gmail.com",
    },
    {
      _id: "2",
      landlord_name: "Aganya",
      contact: "0717722456",
      email: "aganya@gmail.com",
    },
  ],
};

export default function Home() {
  // States definitions
  const [isModalVisibleUnreviewed, setModalVisibleUnreviewed] = useState(false);
  const [isModalVisibleProperties, setModalVisibleProperties] = useState(false);
  const [isModalVisibleClient, setModalVisibleClient] = useState(false);
  const [activeID, setActiveID] = useState(null);

  const [keywordClient, setKeywordClient] = useState("");
  const [keywordUser, setKeywordUser] = useState("");
  const [keywordProp, setKeywordProp] = useState("");

  const [authorised, setAuthorised] = useState(true);
  const [width, setWidth] = useState(null);

  const [form] = Form.useForm();

  //Use effect
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  // Functions

  const openMoreUnreviewed = (id) => {
    setModalVisibleUnreviewed(true);
    setActiveID(id);
  };

  const openMoreProperty = (id) => {
    setModalVisibleProperties(true);
    setActiveID(id);
  };

  const openMoreClient = (id) => {
    setModalVisibleClient(true);
    setActiveID(id);
  };

  const handleOk = () => {
    if (isModalVisibleUnreviewed) {
      // accept
      data.get_Properties.filter(
        (prop) => prop._id == activeID
      )[0].reviewed = true;
      message.success("Property reviewed and added successfully");
      setModalVisibleUnreviewed(false);
      setActiveID(null);
    }

    if (isModalVisibleProperties) {
      setModalVisibleProperties(false);
      setActiveID(null);
    }

    if (isModalVisibleClient) {
      setModalVisibleClient(false);
      setActiveID(null);
    }
  };

  const handleRevoke = () => {
    // revoke
    data.get_Properties.filter(
      (prop) => prop._id == activeID
    )[0].revoked = true;
    message.info("Propery revoked");
    setModalVisibleUnreviewed(false);
    setActiveID(null);
  };

  const handleDeleteProp = () => {
    // delete property
    message.info("Property deleted!");
    setActiveID(null);
    setModalVisibleProperties(false);
  };

  const handleDeleteUser = (id) => {
    //delete user
    message.info("User deleted!");
  };

  const handleDeleteClient = () => {
    message.info("Client removed!");

    setModalVisibleClient(false);
    setActiveID(null);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Columns schema

  const columns_unreviewed = [
    {
      title: "Name",
      dataIndex: "property_name",
      key: "property_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openMoreUnreviewed(record._id)}>More</a>
        </Space>
      ),
    },
  ];

  const columns_properties = [
    {
      title: "Name",
      dataIndex: "property_name",
      key: "property_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openMoreProperty(record._id)}>More</a>
        </Space>
      ),
    },
  ];

  const columns_users = [
    {
      title: "",
      dataIndex: "picture",
      key: "picture",
      render: (text) => (
        <Image src={img} width={32} height={32} style={{ borderRadius: 16 }} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columns_clients = [
    {
      title: "Name",
      dataIndex: "landlord_name",
      key: "landlord_name",
    },
    {
      title: "Mobile",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openMoreClient(record._id)}>More</a>
        </Space>
      ),
    },
  ];

  // Login form
  if (!authorised)
    return (
      <div className={styles.page} style={{ height: "100vh" }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          className={styles.form}
        >
          <Divider orientation="right">
            <h3>Login</h3>
          </Divider>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );

  if (width == null)
    return (
      <div className={styles.page} style={{ height: "100vh" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Spin size="large" />
        </div>
      </div>
    );

  return (
    <div className={styles.page}>
      {/* Header */}
      <Row style={{ justifyContent: "space-between" }}>
        <div className={styles.title}>Dashboard</div>
        <Button type="link" size="small" style={{ alignSelf: "center" }}>
          Sign out
        </Button>
      </Row>

      {/* Stats tile */}
      {width > 991 ? (
        <Row>
          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginRight: 24,
              width: "200px",
            }}
            title="Properties"
            value={data.get_Properties.length}
            prefix={<HomeOutlined />}
          />

          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginRight: 24,
              width: "200px",
            }}
            title="Clients"
            value={data.get_Clients.length}
            prefix={<UserOutlined />}
          />

          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginRight: 24,
              width: "200px",
            }}
            title="Users"
            value={data.get_Users.length}
            prefix={<UsergroupAddOutlined />}
          />
        </Row>
      ) : (
        <div style={{ background: "rgb(245,245,245)", padding: 0 }}>
          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginBottom: 8,
              width: "100%",
            }}
            title="Properties"
            value={data.get_Properties.length}
            prefix={<HomeOutlined />}
          />

          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginBottom: 8,
              width: "100%",
            }}
            title="Clients"
            value={data.get_Clients.length}
            prefix={<UserOutlined />}
          />

          <Statistic
            style={{
              background: "white",
              padding: 16,
              marginBottom: 8,
              width: "100%",
            }}
            title="Users"
            value={data.get_Users.length}
            prefix={<UsergroupAddOutlined />}
          />
        </div>
      )}
      <br />

      <Row>
        <Col
          sm={24}
          lg={14}
          style={{
            marginRight: width > 991 ? 24 : 0,
          }}
        >
          {/* Unreviewed tile */}
          <div className={styles.container}>
            <div className={styles.subtitle}>Unreviewed</div>
            <br />
            <Table
              dataSource={data.get_Properties.filter(
                (record) => record.reviewed == false && record.revoked == false
              )}
              columns={columns_unreviewed}
              pagination={{ pageSize: 50 }}
              size="small"
              scroll={{ y: width < 992 ? 200 : 400 }}
            />
            <Modal
              visible={isModalVisibleUnreviewed && activeID !== null}
              onOk={handleOk}
              okButtonProps={{
                style: {
                  display: "none",
                },
              }}
              cancelButtonProps={{
                style: {
                  display: "none",
                },
              }}
              onCancel={() => {
                setModalVisibleUnreviewed(false);
                setActiveID(null);
              }}
              footer={[
                <Button key="1" type="primary" onClick={handleRevoke}>
                  Revoke
                </Button>,
                <Button key="2" type="dashed" onClick={handleOk}>
                  Accept
                </Button>,
              ]}
            >
              <h2>
                {activeID
                  ? data.get_Properties.filter(
                      (record) => record._id == activeID
                    )[0].property_name
                  : null}
              </h2>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Basic" key="1">
                  {activeID ? (
                    <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Description
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].description
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Location
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].location
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Ammenities
                        </Text>
                        {data.get_Properties
                          .filter((record) => record._id == activeID)[0]
                          .amenities.split(",")
                          .map((tag) => (
                            <Tag
                              color={
                                tag.length < 4
                                  ? "magenta"
                                  : tag.length >= 4 && tag.length <= 7
                                  ? "purple"
                                  : tag.length > 7
                                  ? "cyan"
                                  : "green"
                              }
                            >
                              {tag}
                            </Tag>
                          ))}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Price
                        </Text>
                        <Text strong>
                          {data.get_Properties.filter(
                            (record) => record._id == activeID
                          )[0].price + "KES"}
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Vacancy
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].vacancy
                          }
                        </Text>
                      </div>
                    </div>
                  ) : null}
                </TabPane>
                <TabPane tab="Contacts" key="2">
                  {activeID ? (
                    <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.landlord_name
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner's contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.contact
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner's email
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.email
                          }
                        </Text>
                      </div>
                      <Divider />
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].caretaker1
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 1 contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].c1contact
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 2
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].caretaker2
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 2 contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].c2contact
                          }
                        </Text>
                      </div>
                    </div>
                  ) : null}
                </TabPane>
                <TabPane tab="Gallery" key="3">
                  <Carousel
                    autoplay
                    style={{ maxHeight: "40vh", overflow: "scroll" }}
                  >
                    <div>
                      <div
                        style={{
                          height: "40vh",
                          color: "#fff",
                          background: "#364d79",
                          textAlign: "center",
                        }}
                      >
                        Image 1
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          height: "40vh",
                          color: "#fff",
                          background: "#364d79",
                          textAlign: "center",
                        }}
                      >
                        Image 2
                      </div>
                    </div>
                  </Carousel>
                </TabPane>
              </Tabs>
            </Modal>
          </div>
          <br />
        </Col>

        <Col sm={24} lg={9}>
          {/* Users tile */}
          <div className={styles.container}>
            <div className={styles.subtitle}>Users</div>
            <div style={{ padding: "12px 0px" }}>
              <Input
                style={{ margin: "8px 0px" }}
                placeholder="Find user..."
                value={keywordUser}
                allowClear
                suffix={<SearchOutlined />}
                onChange={(e) => {
                  setKeywordUser(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </div>
            <Table
              dataSource={data.get_Users.filter(
                (user) =>
                  user.name.toLowerCase().includes(keywordUser.toLowerCase()) ||
                  user.email.toLowerCase().includes(keywordUser.toLowerCase())
              )}
              columns={columns_users}
              pagination={{ pageSize: 50 }}
              size="small"
              scroll={{ y: width < 992 ? 200 : 400 }}
            />
          </div>
          <br />
        </Col>
      </Row>

      <Row>
        <Col
          sm={24}
          lg={12}
          style={{
            marginRight: width > 991 ? 24 : 0,
          }}
        >
          {/* Properties tile */}
          <div className={styles.container}>
            <div className={styles.subtitle}>Properties</div>
            <div style={{ padding: "12px 0px" }}>
              <Input
                style={{ margin: "8px 0px" }}
                placeholder="Find property..."
                value={keywordProp}
                allowClear
                suffix={<SearchOutlined />}
                onChange={(e) => {
                  setKeywordProp(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </div>
            <Table
              dataSource={data.get_Properties.filter((prop) => {
                if (keywordProp.toLowerCase() == "vacant") {
                  return prop.vacancy > 0;
                } else if (keywordProp.toLowerCase().split(",")[0] == "<") {
                  return prop.price < keywordProp.toLowerCase().split(",")[1];
                } else if (keywordProp.toLowerCase().split(",")[0] == ">") {
                  return prop.price > keywordProp.toLowerCase().split(",")[1];
                } else if (keywordProp.toLowerCase().split(",")[0] == "=") {
                  return prop.price == keywordProp.toLowerCase().split(",")[1];
                } else {
                  return (
                    prop.property_name
                      .toLowerCase()
                      .includes(keywordProp.toLowerCase()) ||
                    prop.location
                      .toLowerCase()
                      .includes(keywordProp.toLowerCase())
                  );
                }
              })}
              columns={columns_properties}
              pagination={{ pageSize: 50 }}
              size="small"
              scroll={{ y: width < 992 ? 200 : 400 }}
            />
            <Modal
              visible={isModalVisibleProperties && activeID !== null}
              okButtonProps={{
                style: {
                  display: "none",
                },
              }}
              cancelButtonProps={{
                style: {
                  display: "none",
                },
              }}
              onCancel={() => {
                setModalVisibleProperties(false);
                setActiveID(null);
              }}
              footer={[
                <Popconfirm
                  title="Are you sure to delete this property?"
                  onConfirm={handleDeleteProp}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button key="1" type="primary">
                    Delete
                  </Button>
                </Popconfirm>,
                <Button key="2" type="dashed" onClick={handleOk}>
                  Ok
                </Button>,
              ]}
            >
              <h2>
                {activeID
                  ? data.get_Properties.filter(
                      (record) => record._id == activeID
                    )[0].property_name
                  : null}
              </h2>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Basic" key="1">
                  {activeID ? (
                    <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Description
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].description
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Location
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].location
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Ammenities
                        </Text>
                        {data.get_Properties
                          .filter((record) => record._id == activeID)[0]
                          .amenities.split(",")
                          .map((tag) => (
                            <Tag
                              color={
                                tag.length < 4
                                  ? "magenta"
                                  : tag.length >= 4 && tag.length <= 7
                                  ? "purple"
                                  : tag.length > 7
                                  ? "cyan"
                                  : "green"
                              }
                            >
                              {tag}
                            </Tag>
                          ))}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Price
                        </Text>
                        <Text strong>
                          {data.get_Properties.filter(
                            (record) => record._id == activeID
                          )[0].price + "KES"}
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Vacancy
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].vacancy
                          }
                        </Text>
                      </div>
                    </div>
                  ) : null}
                </TabPane>
                <TabPane tab="Contacts" key="2">
                  {activeID ? (
                    <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.landlord_name
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner's contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.contact
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Owner's email
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].misc.email
                          }
                        </Text>
                      </div>
                      <Divider />
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].caretaker1
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 1 contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].c1contact
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 2
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].caretaker2
                          }
                        </Text>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <Text
                          type="secondary"
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Caretaker 2 contact
                        </Text>
                        <Text strong>
                          {
                            data.get_Properties.filter(
                              (record) => record._id == activeID
                            )[0].c2contact
                          }
                        </Text>
                      </div>
                    </div>
                  ) : null}
                </TabPane>
                <TabPane tab="Gallery" key="3">
                  <Carousel
                    autoplay
                    style={{ maxHeight: "40vh", overflow: "scroll" }}
                  >
                    <div>
                      <div
                        style={{
                          height: "40vh",
                          color: "#fff",
                          background: "#364d79",
                          textAlign: "center",
                        }}
                      >
                        Image 1
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          height: "40vh",
                          color: "#fff",
                          background: "#364d79",
                          textAlign: "center",
                        }}
                      >
                        Image 2
                      </div>
                    </div>
                  </Carousel>
                </TabPane>
              </Tabs>
            </Modal>
          </div>
          <br />
        </Col>

        <Col sm={24} lg={11}>
          {/* Clients tile */}
          <div className={styles.container}>
            <div className={styles.subtitle}>Clients</div>
            <div style={{ padding: "12px 0px" }}>
              <Input
                style={{ margin: "8px 0px" }}
                placeholder="Find client..."
                value={keywordClient}
                allowClear
                suffix={<SearchOutlined />}
                onChange={(e) => {
                  setKeywordClient(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </div>

            <Table
              dataSource={data.get_Clients.filter(
                (client) =>
                  client.landlord_name
                    .toLowerCase()
                    .includes(keywordClient.toLowerCase()) ||
                  client.contact.includes(keywordClient)
              )}
              columns={columns_clients}
              pagination={{ pageSize: 50 }}
              size="small"
              scroll={{ y: width < 992 ? 200 : 400 }}
            />
            <Modal
              visible={isModalVisibleClient && activeID !== null}
              okButtonProps={{
                style: {
                  display: "none",
                },
              }}
              cancelButtonProps={{
                style: {
                  display: "none",
                },
              }}
              onCancel={() => {
                setModalVisibleClient(false);
                setActiveID(null);
              }}
              footer={[
                <Popconfirm
                  title="Are you sure to remove this client?"
                  onConfirm={handleDeleteClient}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button key="1" type="primary">
                    Delete
                  </Button>
                </Popconfirm>,
                <Button key="2" type="dashed" onClick={handleOk}>
                  Ok
                </Button>,
              ]}
            >
              <h2>Client</h2>
              {activeID ? (
                <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                  <div style={{ marginBottom: 12 }}>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: 2 }}
                    >
                      Name
                    </Text>
                    <Text strong>
                      {
                        data.get_Clients.filter(
                          (record) => record._id == activeID
                        )[0].landlord_name
                      }
                    </Text>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: 2 }}
                    >
                      Name
                    </Text>
                    <Paragraph copyable>
                      {
                        data.get_Clients.filter(
                          (record) => record._id == activeID
                        )[0].contact
                      }
                    </Paragraph>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: 2 }}
                    >
                      Properties
                    </Text>
                    {data.get_Properties
                      .filter((prop) => prop.misc._id == activeID)
                      .map((prop) => (
                        <>
                          <Row style={{ marginLeft: 12, marginBottom: 8 }}>
                            <Col>
                              <a>{prop.property_name} , </a>
                            </Col>
                            <Col style={{ marginLeft: 3 }}>
                              {prop.location} ,{" "}
                            </Col>
                            <Col>
                              {prop.amenities.split(",").map((tag) => (
                                <Tag
                                  color={
                                    tag.length < 4
                                      ? "magenta"
                                      : tag.length >= 4 && tag.length <= 7
                                      ? "purple"
                                      : tag.length > 7
                                      ? "cyan"
                                      : "green"
                                  }
                                >
                                  {tag}
                                </Tag>
                              ))}
                            </Col>
                          </Row>
                        </>
                      ))}
                  </div>
                </div>
              ) : null}
            </Modal>
          </div>
          <br />
        </Col>
      </Row>
    </div>
  );
}
