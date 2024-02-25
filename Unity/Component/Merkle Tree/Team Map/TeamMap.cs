using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class TeamMap
    {
        public List<TeamMapNode> teamNodes;
        public List<TeamInvitationMapNode> teamInvitationNodes;

        public void UpdateNodes(List<TeamMapNode> newTeamNodes, List<TeamInvitationMapNode> newTeamInvitationNodes)
        {
            teamNodes = newTeamNodes ?? new List<TeamMapNode>();
            teamInvitationNodes = newTeamInvitationNodes ?? new List<TeamInvitationMapNode>();
        }
    }
}