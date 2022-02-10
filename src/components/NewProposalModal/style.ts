import styled from "styled-components";
import { Form, Modal as antdModal } from "antd";

export const Modal = styled(antdModal).attrs(() => ({
  width: "50%",
}))`
  .ant-modal-footer,
  .ant-modal-header {
    border: none;
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

  .dynamic-delete-button {
    position: relative;
    top: 4px;
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

  .ant-typography {
    margin: 0 !important;
  }
`;
