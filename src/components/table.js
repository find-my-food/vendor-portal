import styled from 'styled-components'

export default styled.table`
  width: calc(100% - 20px);
  border-spacing: 0;
  border: 1px solid #ccc;
  background: white;
  margin: 10px;
  thead {
    background: rgba(0, 0, 0, 0.01);
    td {
      border-bottom: 1px solid #ccc;
    }
  }
  td {
    padding: 10px;
    vertical-align: top;
    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
  tr {
    &:not(:last-child) td {
      border-bottom: 1px solid #ccc;
    }
  }
`
