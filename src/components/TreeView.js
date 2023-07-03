import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TreeView.css'; 

const TreeView = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productTemplates, setProductTemplates] = useState([]);

  useEffect(() => {
    fetchSubgroups();
  }, []);

  const fetchSubgroups = async () => {
    try {
      const response = await axios.get('https://app.kjssteel.com/api/subgroups');
      setSubgroups(response.data);
    } catch (error) {
      console.error('Error fetching subgroups:', error);
    }
  };

  const loadCategories = async (subgroupId) => {
    try {
      if (categories.length > 0 || subcategories.length > 0 || productTemplates.length > 0) {
        setCategories([]);
        setSubcategories([]);
        setProductTemplates([]);
      } else {
        const response = await axios.get(`https://app.kjssteel.com/api/categories/${subgroupId}`);
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      if (subcategories.length > 0 || productTemplates.length > 0) {
        setSubcategories([]);
        setProductTemplates([]);
      } else {
        const response = await axios.get(`https://app.kjssteel.com/api/subcategories/${categoryId}`);
        setSubcategories(response.data);
      }
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const loadProductTemplates = async (subcategoryId) => {
    try {
      setProductTemplates([]);
      const response = await axios.get(`https://app.kjssteel.com/api/productTemplates/${subcategoryId}`);
      setProductTemplates(response.data);
    } catch (error) {
      console.error('Error loading product templates:', error);
    }
  };

  return (
    <div className="tree-view">
      <div className="rectangle rectangle-group">
        <h4>GROUP</h4>
        <ul className="subgroup-list">
          {subgroups.map((subgroup) => (
            <li key={subgroup.id} onClick={() => loadCategories(subgroup.id)}>
              {subgroup.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rectangle rectangle-category">
        <h4>CATEGORY</h4>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} onClick={() => loadSubcategories(category.id)}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rectangle rectangle-subcategory1">
        <h4>SUBCATEGORY 1</h4>
        <ul className="subcategory-list">
          {subcategories.map((subcategory) => (
            <li key={subcategory.id} onClick={() => loadProductTemplates(subcategory.id)}>
              {subcategory.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rectangle rectangle-subcategory2">
        <h4>SUBCATEGORY 2</h4>
        <ul className="product-template-list">
          {productTemplates.map((template) => (
            <li key={template.id}>{template.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TreeView;
