import { Form, Modal as antdModal } from "antd";
import styled from "styled-components";

export const Modal = styled(antdModal).attrs(() => ({
  width: "50%",
  footer: null,
}))`
  .ant-modal-content {
    padding: 1rem 2rem;
    border-radius: 8px;
  }
  .ant-modal-footer,
  .ant-modal-header {
    border: none;
  }

  .ant-modal-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const ProposalHeader = styled.div`
  div:last-of-type {
    display: flex;
    justify-content: space-between;
  }
`;

export const ProposalBody = styled.div``;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  .dynamic-delete-button {
    position: absolute;
    float: right;
    top: 4px;
    right: -38px;
    margin: 0 8px;
    color: #999;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .dynamic-delete-button:hover {
    color: #777;
  }

  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ValuesContainer = styled.div`
  width: 53%;
  margin-left: auto;
`;

export const ValuesRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  .ant-typography {
    margin: 0 !important;
  }

  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

export const ButtonContainer = styled(Form.Item)`
  margin-bottom: 0;
`;
