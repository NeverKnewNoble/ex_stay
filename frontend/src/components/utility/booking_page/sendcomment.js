
import {ref} from "vue";
import { createResource } from "frappe-ui";

export function useSendComment(comment, property, userEmail) {

    const sendCommnent = async () => {
        try{
            const commentdata = {
                doctype: "Property Comments",
                item: property.value?.item_code || "",
                email:  userEmail.value || "",
                comment: comment.value || "",
            }

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
                console.log("✅ Post successful!", commentResponse);
                alert(`🎉 post successful! post ID: ${commentResponse.name}`);
                
            } else {
                console.error("❌ Booking failed:", commentResponse);
                alert("comment positng failed. Please try again.");
            }

        }catch(err) {
            console.error("🚨 Unable to post comment", err);
            alert("An error occurred. Please check the console for details.");
        }
    };

    return {
        comment,
        sendCommnent,
    }

};