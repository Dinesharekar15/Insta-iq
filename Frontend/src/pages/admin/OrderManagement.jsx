import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";

const OrderManagement = () => {
  const { 
    orders, 
    orderStats, 
    fetchOrdersData, 
    fetchOrderStats,
    updateOrderStatus, 
    loading 
  } = useAdmin();

  console.log('Orders from context:', orders);
  console.log('Order stats from context:', orderStats);
  console.log('Loading state:', loading);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
    fetchOrderStats();
  }, [currentPage, searchTerm, filterStatus]);

  const loadOrders = async () => {
    try {
      console.log('Loading orders with params:', {
        page: currentPage,
        limit: ordersPerPage,
        search: searchTerm,
        status: filterStatus === "all" ? "" : filterStatus,
      });
      
      const response = await fetchOrdersData({
        page: currentPage,
        limit: ordersPerPage,
        search: searchTerm,
        status: filterStatus === "all" ? "" : filterStatus,
      });
      
      console.log('Response from fetchOrdersData:', response);
      
      if (response) {
        setTotalPages(response.totalPages || 1);
        setTotalOrders(response.totalOrders || 0);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result) {
        await loadOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'completed': return '#28a745';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '25px', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '28px', fontWeight: 'bold' }}>
          Order Management
        </h1>
        
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
            {orderStats?.totalOrders || 0}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Total Orders</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
            ₹{orderStats?.totalRevenue || 0}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Total Revenue</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
            {orderStats?.deliveredOrders || 0}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Delivered Orders</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
            {orderStats?.pendingOrders || 0}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Pending Orders</div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Search orders by customer, course, or order ID..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={handleStatusFilter}
            style={{
              padding: '12px 15px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              minWidth: '150px'
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Course</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: '40px', 
                    textAlign: 'center', 
                    color: '#666' 
                  }}>
                    <i className="fa fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: '40px', 
                    textAlign: 'center', 
                    color: '#666' 
                  }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                    <td style={{ padding: '15px 0', color: '#333', fontWeight: 'bold' }}>
                      #{order._id.slice(-8)}
                    </td>
                    <td style={{ padding: '15px 0' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{order.user?.name || 'N/A'}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{order.user?.email || 'N/A'}</div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={order.course?.image || '/placeholder-course.jpg'}
                          alt={order.course?.title || 'Course'}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '5px',
                            marginRight: '10px',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{ fontSize: '14px', color: '#333' }}>
                          {order.course?.title ? (
                            order.course.title.length > 30 ? 
                            order.course.title.substring(0, 30) + '...' : 
                            order.course.title
                          ) : 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 0', color: '#333', fontWeight: 'bold', fontSize: '16px' }}>
                      ₹{order.amount || '0'}
                    </td>
                    <td style={{ padding: '15px 0', color: '#666', fontSize: '14px' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '15px 0' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '20px',
                          fontSize: '12px',
                          background: getStatusColor(order.status),
                          color: getStatusColor(order.status) === '#28a745' ? 'white' : 
                                 getStatusColor(order.status) === '#ffc107' ? '#333' : 'white',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing </option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '20px',
            gap: '10px'
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                background: currentPage === 1 ? '#f8f9fa' : '#fff',
                color: currentPage === 1 ? '#666' : '#333',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>

            <span style={{ 
              padding: '0 15px', 
              color: '#666',
              fontSize: '14px'
            }}>
              Page {currentPage} of {totalPages} ({totalOrders} total orders)
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                background: currentPage === totalPages ? '#f8f9fa' : '#fff',
                color: currentPage === totalPages ? '#666' : '#333',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>
                  Order Details - #{selectedOrder._id.slice(-8)}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#999',
                    padding: '0',
                    width: '30px',
                    height: '30px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Customer Information */}
                <div>
                  <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Customer Information</h4>
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Name:</strong> {selectedOrder.user?.name || 'N/A'}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedOrder.user?.phone || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Course Information */}
                <div>
                  <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Course Information</h4>
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <img
                        src={selectedOrder.course?.image || '/placeholder-course.jpg'}
                        alt={selectedOrder.course?.title || 'Course'}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '5px',
                          marginRight: '15px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedOrder.course?.title || 'N/A'}</div>
                        <div style={{ color: '#666' }}>Price: ${selectedOrder.course?.price || selectedOrder.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div>
                  <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Order Information</h4>
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Amount:</strong> ${selectedOrder.amount}
                      </div>
                      <div>
                        <strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}
                      </div>
                      <div>
                        <strong>Transaction ID:</strong> {selectedOrder.transactionId || 'N/A'}
                      </div>
                      <div>
                        <strong>Payment Status:</strong>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          textTransform: 'capitalize',
                          background: getPaymentStatusColor(selectedOrder.paymentStatus),
                          color: getPaymentStatusColor(selectedOrder.paymentStatus) === '#ffc107' ? '#333' : 'white'
                        }}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      <div>
                        <strong>Order Status:</strong>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          textTransform: 'capitalize',
                          background: getStatusColor(selectedOrder.status),
                          color: getStatusColor(selectedOrder.status) === '#ffc107' ? '#333' : 'white'
                        }}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  onClick={() => setShowOrderModal(false)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;