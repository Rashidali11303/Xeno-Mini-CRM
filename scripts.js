document.addEventListener('DOMContentLoaded', function() {
    const customerForm = document.getElementById('customerForm');
    const customerTable = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    const customerDetails = document.getElementById('customerDetails');
    const activityLog = document.getElementById('activityLog');
    const notifications = document.getElementById('notifications');
    const searchInput = document.getElementById('search');

    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        addCustomer(name, email, phone);
        logActivity(`Added customer: ${name}`);
        showNotification(`New customer ${name} added`);
        customerForm.reset();
    });

    function addCustomer(name, email, phone) {
        const row = customerTable.insertRow();
        
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const phoneCell = row.insertCell(2);
        const actionsCell = row.insertCell(3);
        
        nameCell.textContent = name;
        emailCell.textContent = email;
        phoneCell.textContent = phone;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', function() {
            editCustomer(row);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function() {
            deleteCustomer(row);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.addEventListener('click', function() {
            displayCustomerDetails(name, email, phone);
        });
    }

    function editCustomer(row) {
        const name = prompt('Enter new name', row.cells[0].textContent);
        const email = prompt('Enter new email', row.cells[1].textContent);
        const phone = prompt('Enter new phone', row.cells[2].textContent);
        
        if (name && email && phone) {
            row.cells[0].textContent = name;
            row.cells[1].textContent = email;
            row.cells[2].textContent = phone;
            logActivity(`Edited customer: ${name}`);
            showNotification(`Customer ${name} updated`);
        }
    }

    function deleteCustomer(row) {
        const name = row.cells[0].textContent;
        customerTable.deleteRow(row.rowIndex - 1);
        logActivity(`Deleted customer: ${name}`);
        showNotification(`Customer ${name} deleted`);
    }

    function displayCustomerDetails(name, email, phone) {
        customerDetails.innerHTML = `
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        `;
    }

    function logActivity(activity) {
        const listItem = document.createElement('li');
        listItem.textContent = activity;
        activityLog.appendChild(listItem);
    }

    function showNotification(message) {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        notifications.appendChild(listItem);
        setTimeout(() => {
            listItem.remove();
        }, 5000);
    }

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const rows = customerTable.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;

            for (let j = 0; j < cells.length - 1; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }

            rows[i].style.display = match ? '' : 'none';
        }
    });
});
