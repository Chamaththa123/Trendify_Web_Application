import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/dataArrays";

export const OrderDetails = () => {
  const { id } = useParams(); // Destructure id from useParams (corrected from idOrder)
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("order id", id); // Logging the correct id

  useEffect(() => {
    // Function to fetch order by ID
    const fetchOrderById = async () => {
      try {
        const response = await axiosClient.get(`/Orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>No order found!</p>;
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // For 12-hour format with AM/PM
    });
  };

  const TABLE_ORDER_ITEM = [
      {
        name: "Product",
        selector: (row) => row.productId,
        wrap: true,
        compact: true,
        maxWidth: "auto",
        cellStyle: {
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
      },
        {
          name: "Unit Price (Rs)",
          selector: (row) => row.unitPrice.toFixed(2),
          wrap: true,
          compact: true,
          maxWidth: "auto",
          cellStyle: {
            whiteSpace: "normal",
            wordBreak: "break-word",
          },
          right:true
        },
        {
          name: "Quantity",
          selector: (row) => row.quantity,
          wrap: true,
          compact: true,
          maxWidth: "auto",
          cellStyle: {
            whiteSpace: "normal",
            wordBreak: "break-word",
          },
          right:true
        },
        {
            name: "Total (Rs)",
            selector: (row) => row.total.toFixed(2),
            wrap: true,
            compact: true,
            maxWidth: "auto",
            cellStyle: {
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
            right:true
          },
      {
        name: "Is Delivered?",
        selector: (row) =>
          row.isDelivered === false ? (
            <div className="status-pending-btn">No</div>
          ) : row.isDelivered === true ? (
            <div className="status-active-btn">Yes</div>
          ) : null,
        wrap: false,
        minWidth: "auto",
        center:true
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            {/* <button
              className="edit-btn me-4"
            //   onClick={() => handleViewClick(row)}
              title="Edit List"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <ViewIcon />
            </button> */}
          </div>
        ),
        minWidth: "50px",
      },
    ];

  return (
    <section>
      <div className="container bg-white rounded-card p-4 theme-text-color">
        <h4 className="mb-5">Order : #OR123</h4>
        <div className="row form-btn-text">
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className="col-6" style={{ width: "200px" }}>
                Date
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                {formatDate(order.date)}{" "}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div style={{ width: "200px" }}>Customer</div>
              <div style={{ width: "auto" }}>{order.customerId} </div>
            </div>
          </div>
        </div>

        <div className="row form-btn-text mt-2">
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className=" text-nowrap" style={{ width: "200px" }}>
                Recipient
              </div>
              <div className="text-nowrap" style={{ width: "auto" }}>
                K.J.S.Rajapaksha{" "}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className="col-6 text-nowrap" style={{ width: "200px" }}>
                Recipient Email
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                shmodchamaththa@gmail.com{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="row form-btn-text mt-2">
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className=" text-nowrap" style={{ width: "200px" }}>
                Recipient Contact No
              </div>
              <div className="text-nowrap" style={{ width: "auto" }}>
                0703835678{" "}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className="col-6 text-nowrap" style={{ width: "200px" }}>
                Recipient Address
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                Kaduwela, korathota
              </div>
            </div>
          </div>
        </div>

        <div className="row form-btn-text mt-5">
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className=" text-nowrap" style={{ width: "200px" }}>
                Order Item count
              </div>
              <div className="text-nowrap" style={{ width: "auto" }}>
                {order.orderItemCount}{" "}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className="col-6 text-nowrap" style={{ width: "200px" }}>
                Status
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                {order.status === 0 ? (
                  <div className="status-pending-btn">Pending</div>
                ) : order.status === 1 ? (
                  <div className="status-active-btn">Complete</div>
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="row form-btn-text mt-2">
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className=" text-nowrap" style={{ width: "200px" }}>
                Is Cancel Request?
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                {order.isCancellationRequested ? "Yes" : "No"}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <div className="row">
              <div className="col-6 text-nowrap" style={{ width: "200px" }}>
                Is Cancel Approved?
              </div>
              <div className="col-6 text-nowrap" style={{ width: "auto" }}>
                {order.isCancellationApproved ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>

        <div className="row form-btn-text mt-2">
          <div className="col-12 d-flex justify-content-left">
            <div className="row">
              <div className=" text-nowrap" style={{ width: "200px" }}>
                Cancelation Note
              </div>
              <div className="text-nowrap" style={{ width: "auto" }}>
                {order.cancellationNote}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-3">
      <DataTable
        columns={TABLE_ORDER_ITEM}
        responsive
        data={order.orderItems}
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

      </div>
    </section>
  );
};
