using UnityEngine;

public class Merchant : MonoBehaviour
{
    bool isPotionPurchased;

    public GameObject UI;

    void Update()
    {
        if (!isPotionPurchased)
        {
            if (Input.GetKeyDown(KeyCode.E))
            {
                UI.SetActive(!UI.activeSelf);
                isPotionPurchased = true;
            }
        }
    }
}
