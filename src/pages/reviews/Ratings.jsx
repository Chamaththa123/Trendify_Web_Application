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
import { ChangeIcon, DeleteIcon, EditNewIcon } from "../../utils/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export const Ratings = () => {
  return (
    <section>
    <div className="container bg-white rounded-card p-4 theme-text-color">
      <div className="row">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <div className="col-6">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Total Ratings
              </span><br/>
              <span style={{ fontSize: "15px", fontWeight: "500" }}>
               45
              </span>
              
            </div>

            <div className="col-6">
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Average Rating
              </span><br/>
              <span style={{ fontSize: "15px", fontWeight: "500" }}>
               45
              </span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container bg-white rounded-card p-4 mt-3">
     
    </div>
  </section>
  )
}

