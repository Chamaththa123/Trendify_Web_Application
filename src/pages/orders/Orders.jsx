import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "../../../axios-client";
import Select from "react-select";
import { tableHeaderStyles, customSelectStyles } from "../../utils/dataArrays";
import {
  AddIcon,
  EditIcon,
  ProductCategory,
  ResetIcon,
  UpdateStockIcon,
  ViewIcon,
} from "../../utils/icons";
import { useStateContext } from "../../contexts/NavigationContext";
import { ChangeIcon, DeleteIcon, EditNewIcon } from "../../utils/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export const Orders = () => {
    const { user } = useStateContext();
    const userId = user.id;

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderTableLoading, setOrderTableLoading] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const handleLoading = () => setSelectedOrderId((pre) => !pre);
  
    console.log(orders)
    // Fetching orders from the backend
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axiosClient.get(`/Orders/vendor/${userId}`);
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
      fetchOrders();
    }, [orderTableLoading,userId]);


    const TABLE_PRODUCT_LIST = [
      {
        name: "Date",
        selector: (row) => {
          const date = new Date(row.date);
          return `${date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })} ${date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // For 12-hour format with AM/PM, or set to false for 24-hour format
          })}`;
        },
        wrap: true,
        compact: true,
        maxWidth: "auto",
        cellStyle: {
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
      },      
        {
          name: "Customer",
          selector: (row) => row.description,
          wrap: true,
          compact: true,
          maxWidth: "auto",
          cellStyle: {
            whiteSpace: "normal",
            wordBreak: "break-word",
          },
        },
          {
            name: "Item Count",
            selector: (row) => row.orderItemCount,
            wrap: true,
            compact: true,
            maxWidth: "auto",
            cellStyle: {
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          },
          {
            name: "Total (Rs)",
            selector: (row) => row.totalPrice,
            wrap: true,
            compact: true,
            maxWidth: "auto",
            cellStyle: {
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          },
        {
          name: "Status",
          selector: (row) =>
            row.isActive === false ? (
              <div className="status-inactive-btn">Inactive</div>
            ) : row.isActive === true ? (
              <div className="status-active-btn">Active</div>
            ) : null,
          wrap: false,
          minWidth: "200px",
        },
        {
          name: "Action",
          cell: (row) => (
            <div>
              <button
                className="edit-btn me-4"
                onClick={() => handleEditProductList(row)}
                title="Edit List"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <ViewIcon />
              </button>
            </div>
          ),
          minWidth: "50px",
        },
      ];

  return (
    <section>
    <div className="container bg-white rounded-card p-4 theme-text-color">
      <div className="row">
        <div className="col-6">
          <div className="d-flex align-items-center gap-3">
            <div className="col-5">
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Search by Name
              </span>
              <input
                name="Name"
                type="text"
                className="form-control  col-5"
                // value={nameFilter}
                // onChange={handleNameFilterChange}
              />
            </div>

            <div className="col-6">
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Search by Status
              </span>
              <Select
                classNamePrefix="select"
                // options={statusOptions}
                // onChange={handleStatusFilterChange}
                isSearchable={true}
                name="color"
                styles={customSelectStyles}
                className="col-9"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container bg-white rounded-card p-4 mt-3">
      <DataTable
        columns={TABLE_PRODUCT_LIST}
        responsive
        data={orders}
        customStyles={tableHeaderStyles}
        className="mt-4"
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationComponentOptions={{
          rowsPerPageText: "Entries per page:",
          rangeSeparatorText: "of",
        }}
        noDataComponent={<div className="text-center">No data available</div>}
      />
    </div>

  </section>
  )
}