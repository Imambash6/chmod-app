// Get references to our HTML elements that we'll interact with
const permissionCheckboxes = document.querySelectorAll('.permission-checkbox');
const symbolicOutput = document.getElementById('symbolicOutput');
const octalOutput = document.getElementById('octalOutput');
const commandOutput = document.getElementById('commandOutput');

// Function to calculate and update permissions
function updatePermissions() {
    let userOctal = 0;
    let groupOctal = 0;
    let othersOctal = 0;

    // Loop through all checkboxes to see which ones are checked
    permissionCheckboxes.forEach(checkbox => {
        const permissionType = checkbox.dataset.permissionType; // 'user', 'group', or 'others'
        const permissionValue = parseInt(checkbox.dataset.permissionValue); // 4, 2, or 1

        if (checkbox.checked) {
            if (permissionType === 'user') {
                userOctal += permissionValue;
            } else if (permissionType === 'group') {
                groupOctal += permissionValue;
            } else if (permissionType === 'others') {
                othersOctal += permissionValue;
            }
        }
    });

    // Combine octal values
    const fullOctal = `${userOctal}${groupOctal}${othersOctal}`;

    // Convert octal to symbolic (rwx format)
    const symbolicUser = octalToSymbolic(userOctal);
    const symbolicGroup = octalToSymbolic(groupOctal);
    const symbolicOthers = octalToSymbolic(othersOctal);
    const fullSymbolic = `${symbolicUser}${symbolicGroup}${symbolicOthers}`;

    // Update the HTML elements with the calculated values
    symbolicOutput.textContent = fullSymbolic;
    octalOutput.textContent = fullOctal;
    commandOutput.textContent = `chmod ${fullOctal} filename`;
}

// Helper function to convert a single octal digit (4, 2, 1) to its symbolic representation
function octalToSymbolic(octal) {
    let symbolic = '';
    symbolic += (octal & 4) ? 'r' : '-'; // Check if read (4) bit is set
    symbolic += (octal & 2) ? 'w' : '-'; // Check if write (2) bit is set
    symbolic += (octal & 1) ? 'x' : '-'; // Check if execute (1) bit is set
    return symbolic;
}

// Add an event listener to each checkbox
// When a checkbox's state changes, call the updatePermissions function
permissionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePermissions);
});

// Call updatePermissions once when the page loads to set initial values
document.addEventListener('DOMContentLoaded', updatePermissions);