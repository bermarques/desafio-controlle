import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, InputNumber, Select, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import DatePicker from "../DatePicker";
import {
  ButtonContainer,
  ItemContainer,
  Modal,
  ProposalBody,
  ProposalHeader,
  ValuesContainer,
  ValuesRow,
} from "./style";

interface IItem {
  quantity: number;
  value: number;
  name: string;
  subtotal: number;
}
interface INewProposalModal {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewProposalModal: React.FC<INewProposalModal> = ({ isVisible, setVisibility }) => {
  const [finalValues, setFinalValues] = useState({ subtotal: 0, discount: 0, totalValue: 0 });
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const onFinish = (values: any) => {
    console.log("Valores do formulário:", values);
    console.log("Valores finais:", finalValues);
  };

  const handleOk = () => {
    setVisibility(false);
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  const handlePrices = (key: number) => {
    const fields = form.getFieldsValue();
    const { items } = fields;
    Object.assign(items[key], { subtotal: items[key].value * items[key].quantity });
    form.setFieldsValue({ items });

    const newSubtotal = items.reduce((acc: any, item: IItem) => acc + item.subtotal, 0);
    setFinalValues({
      ...finalValues,
      subtotal: newSubtotal,
      totalValue: newSubtotal - finalValues.discount,
    });
  };

  const handleTotalValue = (val: number) => {
    setFinalValues({
      ...finalValues,
      discount: val,
      totalValue: finalValues.subtotal - val,
    });
  };

  return (
    <Modal title="Nova proposta comercial" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
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
            initialValue={[{ quantity: 1, value: 0 }]}
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
                          <InputNumber
                            onChange={() => handlePrices(key)}
                            style={{ width: "100%" }}
                            step="0.00"
                            decimalSeparator=","
                          />
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
                            onChange={() => handlePrices(key)}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "subtotal"]}
                          label={idx === 0 ? "Subtotal" : ""}
                          style={{ width: "20%" }}
                        >
                          <InputNumber
                            readOnly
                            prefix="R$ "
                            formatter={(value: string | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            parser={(value: any) => value.replace(/\$\s?|(\.*)/g, "")}
                            style={{ width: "100%" }}
                          />
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
              <Typography.Text>
                {finalValues.subtotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography.Text>
            </ValuesRow>
            <Divider />
            <ValuesRow>
              <Typography.Title level={5}>Desconto</Typography.Title>
              <InputNumber
                prefix="R$ "
                style={{ width: "25%" }}
                formatter={(value: string | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value: any) => value.replace(/\$\s?|(\.*)/g, "")}
                onChange={(val) => {
                  handleTotalValue(Number(val));
                }}
              />
            </ValuesRow>
            <Divider />
            <ValuesRow>
              <Typography.Title level={5}>Total</Typography.Title>
              <Typography.Title level={4}>
                {finalValues.totalValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography.Title>
            </ValuesRow>
          </ValuesContainer>
        </ProposalBody>

        <ButtonContainer>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default NewProposalModal;
