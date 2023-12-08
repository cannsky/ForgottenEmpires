using UnityEngine;

public class FootKinematics : MonoBehaviour
{
    public Transform leftFoot;
    public Transform rightFoot;
    public float stepHeight = 0.15f;
    public float stepSpeed = 5f;

    private Vector3 leftFootStartPosition, rightFootStartPosition;
    private Vector3 leftFootTargetPosition, rightFootTargetPosition;
    private Quaternion leftFootStartRotation, rightFootStartRotation;
    private Quaternion leftFootTargetRotation, rightFootTargetRotation;

    private void Start()
    {
        leftFootStartPosition = leftFoot.position;
        rightFootStartPosition = rightFoot.position;
        leftFootStartRotation = leftFoot.rotation;
        rightFootStartRotation = rightFoot.rotation;
    }

    private void Update()
    {
        RaycastFootPosition(leftFoot, ref leftFootStartPosition, ref leftFootTargetPosition, ref leftFootStartRotation, ref leftFootTargetRotation);
        RaycastFootPosition(rightFoot, ref rightFootStartPosition, ref rightFootTargetPosition, ref rightFootStartRotation, ref rightFootTargetRotation);

        MoveFoot(leftFoot, leftFootStartPosition, leftFootTargetPosition, leftFootStartRotation, leftFootTargetRotation);
        MoveFoot(rightFoot, rightFootStartPosition, rightFootTargetPosition, rightFootStartRotation, rightFootTargetRotation);
    }

    private void RaycastFootPosition(Transform foot, ref Vector3 startPostion, ref Vector3 targetPosition, ref Quaternion startRotation, ref Quaternion targetRotation)
    {
        RaycastHit hit;
        if (Physics.Raycast(foot.position, -Vector3.up, out hit, 1f))
        {
            targetPosition = hit.point + Vector3.up * stepHeight;
            targetRotation = Quaternion.FromToRotation(Vector3.up, hit.normal) * foot.rotation;
        }
        else
        {
            targetPosition = foot.position;
            targetRotation = foot.rotation;
        }
    }

    private void MoveFoot(Transform foot, Vector3 startPosition, Vector3 targetPosition, Quaternion startRotation, Quaternion targetRotation)
    {
        foot.position = Vector3.Lerp(startPosition, targetPosition, Time.deltaTime * stepSpeed);
        foot.rotation = Quaternion.Lerp(startRotation, targetRotation, Time.deltaTime * stepSpeed);
    }
}