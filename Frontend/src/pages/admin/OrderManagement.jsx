import React, { useState, useEffect } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Sample order data
  const sampleOrders = [
    {
      id: "ORD001",
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210"
      },
      course: {
        title: "Advanced Excel & Data Analysis",
        price: "₹4,500",
        image: "assets/images/courses/course3.jpg"
      },
      orderDate: "2024-01-15",
      paymentDate: "2024-01-15",
      amount: "₹4,500",
      paymentMethod: "Credit Card",
      paymentStatus: "completed",
      orderStatus: "delivered",
      transactionId: "TXN123456789"
    },
    {
      id: "ORD002",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+91 98765 43211"
      },
      course: {
        title: "Placement Aptitude Course",
        price: "₹6,999",
        image: "assets/images/courses/course2.jpg"
      },
      orderDate: "2024-01-14",
      paymentDate: null,
      amount: "₹6,999",
      paymentMethod: "UPI",
      paymentStatus: "pending",
      orderStatus: "pending",
      transactionId: null
    },
    {
      id: "ORD003",
      user: {
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        phone: "+91 98765 43212"
      },
      course: {
        title: "AI Career Guidance Workshop",
        price: "₹2,500",
        image: "assets/images/courses/course4.jpg"
      },
      orderDate: "2024-01-13",
      paymentDate: "2024-01-13",
      amount: "₹2,500",
      paymentMethod: "Net Banking",
      paymentStatus: "completed",
      orderStatus: "processing",
      transactionId: "TXN987654321"
    },
    {
      id: "ORD004",
      user: {
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        phone: "+91 98765 43213"
      },
      course: {
        title: "ALL INDIA PLACEMENT APTITUDE TEST",
        price: "Free",
        image: "assets/images/courses/course1.jpg"
      },
      orderDate: "2024-01-12",
      paymentDate: "2024-01-12",
      amount: "Free",
      paymentMethod: "N/A",
      paymentStatus: "completed",
      orderStatus: "delivered",
      transactionId: "FREE001"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { 
        ...order, 
        paymentStatus: newStatus,
        paymentDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
      } : order
    ));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.orderStatus === filterStatus;
    const matchesPayment = filterPayment === "all" || order.paymentStatus === filterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { background: '#fff3cd', color: '#856404' };
      case 'processing': return { background: '#d1ecf1', color: '#0c5460' };
      case 'delivered': return { background: '#d4edda', color: '#155724' };
      case 'cancelled': return { background: '#f8d7da', color: '#721c24' };
      default: return { background: '#f8f9fa', color: '#6c757d' };
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return { background: '#fff3cd', color: '#856404' };
      case 'completed': return { background: '#d4edda', color: '#155724' };
      case 'failed': return { background: '#f8d7da', color: '#721c24' };
      default: return { background: '#f8f9fa', color: '#6c757d' };
    }
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.paymentStatus === 'completed' && order.amount !== 'Free')
      .reduce((total, order) => total + parseInt(order.amount.replace('₹', '').replace(',', '')), 0);
  };

  const getPendingPayments = () => {
    return orders.filter(order => order.paymentStatus === 'pending').length;
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
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Order Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage all course orders and payments</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#28a745',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <i className="fa fa-shopping-cart" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Orders</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{orders.length}</div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#007bff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <i className="fa fa-money" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Revenue</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>₹{getTotalRevenue().toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#ffc107',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <i className="fa fa-clock-o" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666' }}>Pending Payments</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{getPendingPayments()}</div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#dc3545',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <i className="fa fa-check-circle" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666' }}>Completed Orders</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                {orders.filter(order => order.orderStatus === 'delivered').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Search by order ID, customer name, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Filter by Order Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Filter by Payment Status
            </label>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
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
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Payment Status</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Order Status</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '15px 0', color: '#333', fontWeight: 'bold' }}>{order.id}</td>
                  <td style={{ padding: '15px 0' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{order.user.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{order.user.email}</div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={order.course.image}
                        alt={order.course.title}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '5px',
                          marginRight: '10px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ fontSize: '14px', color: '#333' }}>
                        {order.course.title.substring(0, 30)}...
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 0', color: '#333', fontWeight: 'bold' }}>{order.amount}</td>
                  <td style={{ padding: '15px 0' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      ...getPaymentStatusColor(order.paymentStatus)
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      ...getStatusColor(order.orderStatus)
                    }}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '15px 0', color: '#666', fontSize: '14px' }}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleViewOrder(order)}
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: '#fff'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: '#fff'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
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
                    <strong>Name:</strong> {selectedOrder.user.name}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Email:</strong> {selectedOrder.user.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedOrder.user.phone}
                  </div>
                </div>
              </div>

              {/* Course Information */}
              <div>
                <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Course Information</h4>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img
                      src={selectedOrder.course.image}
                      alt={selectedOrder.course.title}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '5px',
                        marginRight: '15px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{selectedOrder.course.title}</div>
                      <div style={{ color: '#666' }}>Price: {selectedOrder.course.price}</div>
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
                      <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Amount:</strong> {selectedOrder.amount}
                    </div>
                    <div>
                      <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
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
                        ...getPaymentStatusColor(selectedOrder.paymentStatus)
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
                        ...getStatusColor(selectedOrder.orderStatus)
                      }}>
                        {selectedOrder.orderStatus}
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
      )}
    </div>
  );
};

export default OrderManagement; 