import { ref } from "vue";
import { createResource } from "frappe-ui";

export function useSendComment(comment, property, userEmail) {
    const errorMessage = ref("");
    const alertMessage = ref(null);
    const alertType = ref(null);


    const sendCommnent = async () => {
        try {
            if (!comment.value) {
                errorMessage.value = "You cannot post an empty comment";
                alertMessage.value = "You cannot post an empty comment!";
                alertType.value = "warning";
                return;
            }

            errorMessage.value = ""; // Clear any previous errors

            const commentdata = {
                doctype: "Property Comments",
                item: property.value?.item_code || "",
                email: userEmail.value || "",
                comment: comment.value || "",
            };

            console.log("Comment data:", commentdata);

            const commentResponse = await createResource({
                url: 'frappe.client.insert',
                params: {
                    doc: commentdata,
                },
            }).fetch();

            console.log("API Response:", commentResponse);

            if (commentResponse && commentResponse.name) {
                comment.value = "";
                alertMessage.value = `Comment posted successfully!`;
                alertType.value = "success";
                
            } else {
                console.error("❌ Comment posting failed:", commentResponse);
                alertMessage.value = "Comment posting failed. Please try again.";
                alertType.value = "error";
            }

        } catch (err) {
            console.error("🚨 Unable to post comment", err);
        }
    };

    return {
        comment,
        sendCommnent,
        alertMessage,
        alertType,
    };
}
