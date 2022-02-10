import { Button, Divider, Form, Input, InputNumber, Select, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import DatePicker from "../DatePicker";
import { Modal, ProposalBody, ProposalHeader, ItemContainer, ValuesContainer, ValuesRow } from "./style";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface INewProposalModal {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IItem {
  name: string;
  quantity: number;
  value: number;
  subtotal: number;
}

const NewProposalModal: React.FC<INewProposalModal> = ({ isVisible, setVisibility }) => {
  const [additionalItems, setAdditionalItems] = useState<IItem[]>([{ name: "", quantity: 0, value: 0, subtotal: 0 }]);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleOk = () => {
    setVisibility(false);
  };

  const handleCancel = () => {
    setVisibility(false);
  };
  return (
    <Modal title="Nova proposta comercial" visible={isVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar">
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <ProposalHeader>
          <Form.Item
            label="Título"
            name="title"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Necessário título da proposta comercial",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            <Form.Item label="Cliente" style={{ width: "78%" }}>
              <Select placeholder="Selecione">
                <Select.Option value="client">Cliente 1</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Validade do orçamento" style={{ width: "20%" }}>
              <DatePicker
                defaultValue={dayjs("10/02/2022", dateFormat)}
                format={dateFormat}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
        </ProposalHeader>
        <Divider />

        <ProposalBody>
          <Form.List
            name="items"
            initialValue={[""]}
            rules={[
              {
                validator: async (_, items) => {
                  if (!items || items.length < 1) {
                    return Promise.reject(new Error("Necessário adicionar pelo menos 1 item"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => {
                  return (
                    <>
                      <ItemContainer key={key}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label={idx === 0 ? "Item" : ""}
                          style={{ width: "45%" }}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Necessário nomear o item",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          label={idx === 0 ? "Quantidade" : ""}
                          style={{ width: "12%" }}
                          rules={[
                            {
                              required: true,
                              message: "Digite a quantidade",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: "100%" }} step="0.00" decimalSeparator="," />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          label={idx === 0 ? "Valor" : ""}
                          style={{ width: "20%" }}
                          rules={[
                            {
                              required: true,
                              message: "Digite o valor",
                            },
                          ]}
                        >
                          <InputNumber
                            formatter={(value: string | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            parser={(value: any) => value.replace(/\$\s?|(\.*)/g, "")}
                            style={{ width: "100%" }}
                            prefix="R$ "
                          />
                        </Form.Item>
                        <Form.Item label={idx === 0 ? "Subtotal" : ""} style={{ width: "20%" }}>
                          <Input readOnly />
                        </Form.Item>
                        {idx > 0 ? (
                          <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(name)} />
                        ) : null}
                      </ItemContainer>
                    </>
                  );
                })}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Adicionar item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <ValuesContainer>
            <ValuesRow>
              <Typography.Title level={5}>Subtotal</Typography.Title>
              <Typography.Text>R$ 3000.00</Typography.Text>
            </ValuesRow>
            <Divider />
            <ValuesRow>
              <Typography.Title level={5}>Desconto</Typography.Title>
              <Input style={{ width: "25%" }} />
            </ValuesRow>
            <Divider />
            <ValuesRow>
              <Typography.Title level={5}>Total</Typography.Title>
              <Typography.Title level={4}>R$ 3000.00</Typography.Title>
            </ValuesRow>
          </ValuesContainer>
        </ProposalBody>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewProposalModal;
