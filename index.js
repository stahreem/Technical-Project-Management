document.addEventListener("DOMContentLoaded", () => {
    // Select the arrow button and the sidebar content area
    const arrowButton = document.querySelector(".left-sidebar-black img");
    const sidebar = document.querySelector(".left-sidebar");
    const sidebarContent = document.querySelector(".left-sidebar-content");
    const circle = document.querySelector(".circle");
    const sidebarData = `
      <div class="toggle">
        <p>Explore the world of management</p>
        <ul>
          <li>Technical Project Management</li>
          <li>Threadbuild</li>
          <li>Structure your pointers</li>
          <li>4SA Method</li>
        </ul>
      </div>
    `;
  
    // Add event listener to the arrow button
    arrowButton.addEventListener("click", () => {
      // Remove the circle element
      circle.remove();
    
  
      // Toggle the expanded class for the sidebar
      sidebar.classList.toggle("expanded");
  
      // Check if the content is already displayed
      const isContentVisible = sidebarContent.querySelector(".toggle");
      if (isContentVisible) {
      
        isContentVisible.remove();
      } else {
        
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("toggle"); 
        contentDiv.innerHTML = sidebarData;
  
      
        sidebarContent.appendChild(contentDiv);
      }
  
    });
  });
  


document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json";
  
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        if (data?.tasks?.length > 0) {
          renderSections(data.tasks[0].assets);
        } else {
          console.error("No tasks found in the API response.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
  
  function renderSections(assets) {
    const sectionMapping = {
      "Technical Project Management": "video-section",
      Threadbuild: "threadbuild-section",
      "Structure you pointers": "pointers-section",
      "4SA Method": "4sa-method-section",
    };
  
    assets.forEach((asset) => {
      const sectionClass = sectionMapping[asset.asset_title];
      if (!sectionClass) return; 
  
      const sectionElement = document.querySelector(`.${sectionClass}`);
      if (!sectionElement) return; 
  
      const contentHTML = getContentHTML(asset);
      const descriptionElement = sectionElement.querySelector(".description");
  
      if (descriptionElement) {
        descriptionElement.innerHTML += `
          <strong>${asset.asset_title}:</strong>
          <p>${asset.asset_description}</p>
        `;
  
        if (contentHTML) {
          descriptionElement.innerHTML += contentHTML;
        }
      }
    });
  }
  
 
  function getContentHTML(asset) {
    const trimmedContent = asset.asset_content.trim();
  
    switch (asset.asset_content_type) {
      case "video":
        return `
          <iframe
            width="100%"
            height="315"
            src="${trimmedContent}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      case "threadbuilder":
        return `
          <textarea
            class="overlap-textarea"
            placeholder="${asset.asset_description}">
          </textarea>
        `;
      case "article":
        return trimmedContent
          ? `<a href="${trimmedContent}" target="_blank" class="content-btn">Read More</a>`
          : ""; 
      default:
        return "";
    }
  }
  