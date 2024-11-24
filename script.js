// 使用localStorage存储联系人数据
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

let editingIndex = -1; // 记录当前正在编辑的行索引

// 渲染联系人列表
function renderContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const tr = document.createElement('tr');
        // 添加编辑中的样式
        if (index === editingIndex) {
            tr.classList.add('editing');
        }
        
        tr.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone1}</td>
            <td>${contact.phone2}</td>
            <td>${contact.phone3}</td>
            <td>${contact.email}</td>
            <td>${contact.address}</td>
            <td>
                <button onclick="toggleFavorite(${index})" class="${contact.favorite ? 'favorite' : ''}">
                    ${contact.favorite ? '★' : '☆'}
                </button>
            </td>
            <td>
                <button onclick="editContact(${index})" ${index === editingIndex ? 'disabled' : ''}>编辑</button>
                <button onclick="deleteContact(${index})">删除</button>
            </td>
        `;
        contactList.appendChild(tr);
    });
    saveContacts();
}

// 添加联系人
function addContact() {
    const name = document.getElementById('name').value;
    const phone1 = document.getElementById('phone1').value;
    const phone2 = document.getElementById('phone2').value;
    const phone3 = document.getElementById('phone3').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    
    if (!name || !phone1) {
        alert('请填写完整信息！');
        return;
    }
    
    contacts.push({
        name,
        phone1,
        phone2,
        phone3,
        email,
        address,
        favorite: false
    });
    
    document.getElementById('name').value = '';
    document.getElementById('phone1').value = '';
    document.getElementById('phone2').value = '';
    document.getElementById('phone3').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    renderContacts();
}

// 删除联系人
function deleteContact(index) {
    if (confirm('确定要删这个联系人吗？')) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

// 编辑联系人
function editContact(index) {
    // 如果已经在编辑其他行，先取消之前的编辑
    if (editingIndex !== -1 && editingIndex !== index) {
        cancelEdit();
    }
    
    editingIndex = index;
    const contact = contacts[index];
    
    // 填充表单
    document.getElementById('name').value = contact.name;
    document.getElementById('phone1').value = contact.phone1;
    document.getElementById('phone2').value = contact.phone2;
    document.getElementById('phone3').value = contact.phone3;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
    
    // 切换按钮显示
    const addButton = document.querySelector('.form-container button');
    addButton.style.display = 'none';
    
    // 添加保存和取消按钮
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'edit-buttons';
    buttonContainer.innerHTML = `
        <button onclick="saveEdit()" class="save-btn">
            <i class="fas fa-check"></i> 保存修改
        </button>
        <button onclick="cancelEdit()" class="cancel-btn">
            <i class="fas fa-arrow-left"></i> 返回
        </button>
    `;
    addButton.parentNode.appendChild(buttonContainer);
    
    // 添加编辑中的行样式
    renderContacts();
}

// 保存编辑
function saveEdit() {
    const name = document.getElementById('name').value;
    const phone1 = document.getElementById('phone1').value;
    
    if (!name || !phone1) {
        alert('请填写完整信息！');
        return;
    }
    
    // 更新联系人信息
    contacts[editingIndex] = {
        name: name,
        phone1: phone1,
        phone2: document.getElementById('phone2').value,
        phone3: document.getElementById('phone3').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        favorite: contacts[editingIndex].favorite
    };
    
    // 清空表单并恢复按钮
    cancelEdit();
    renderContacts();
}

// 取消编辑
function cancelEdit() {
    // 清空表单
    document.getElementById('name').value = '';
    document.getElementById('phone1').value = '';
    document.getElementById('phone2').value = '';
    document.getElementById('phone3').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    
    // 恢复按钮显示
    const addButton = document.querySelector('.form-container button');
    addButton.style.display = 'flex';
    
    // 移除编辑按钮
    const editButtons = document.querySelector('.edit-buttons');
    if (editButtons) {
        editButtons.remove();
    }
    
    editingIndex = -1;
    renderContacts();
}

// 切换收藏状态
function toggleFavorite(index) {
    contacts[index].favorite = !contacts[index].favorite;
    renderContacts();
}

// 保存到localStorage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// 导出Excel
function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(contacts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
}

// 导入Excel
function importExcel() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    // 检查是否选择了文件
    if (!file) {
        alert('请先选择要导入的Excel文件！');
        return;
    }
    
    // 检查文件类型
    const fileType = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(fileType)) {
        alert('请选择正确的Excel文件格式（.xlsx 或 .xls）！');
        fileInput.value = '';
        return;
    }
    
    // 检查文件大小（比如限制在10MB以内）
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        alert('文件太大，请选择10MB以内的文件！');
        fileInput.value = '';
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            
            // 检查是否有工作表
            if (workbook.SheetNames.length === 0) {
                throw new Error('Excel文件中没有工作表！');
            }
            
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            // 检查是否有数据
            if (jsonData.length === 0) {
                throw new Error('Excel文件中没有数据！');
            }
            
            // 检查数据格式是否正确
            const requiredFields = ['name', 'phone1'];
            const hasRequiredFields = jsonData.every(item => 
                requiredFields.every(field => item[field])
            );
            
            if (!hasRequiredFields) {
                throw new Error('Excel文件格式不正确，必须包含姓名和主要电话号码！');
            }
            
            // 导入数据
            contacts = contacts.concat(jsonData);
            renderContacts();
            fileInput.value = '';
            alert('导入成功！');
            
        } catch (error) {
            alert('导入失败：' + error.message);
            fileInput.value = '';
        }
    };
    
    reader.onerror = function() {
        alert('文件读取失败，请重试！');
        fileInput.value = '';
    };
    
    reader.readAsArrayBuffer(file);
}

// 初始化渲染
renderContacts(); 