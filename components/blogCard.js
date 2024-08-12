import React, { Component } from "react";
import styles from "/styles/blog.module.css";

export default function BlogCard() {
  return (
    <div class={styles.card}>
      <h3>Upload Files</h3>
      <div class="drop_box">
        <header>
          <h4>Select File here</h4>
        </header>
        <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
        <input type="file" hidden accept=".doc,.docx,.pdf" id="fileID" />
        <button class="btn">Choose File</button>
      </div>
    </div>
  );
}
