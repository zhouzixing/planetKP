define('js/controllers', function (require, exports, module) {
  angular.module('starter')

  .controller('DashCtrl', function ($scope) {
  })
  .controller('ScoreSummaryCtrl', function ($scope) {
    var round = document.getElementById("study_round");
    var round2 = document.getElementById("study_round2");
    var n = 66;
    if (n <= 50) {
      round.style.webkitTransform = "rotate(" + 3.6 * n + "deg)";
      round2.style.display = "none";
    } else {
      round.style.webkitTransform = "rotate(180deg)";
      round2.style.display = "block";
      round2.style.webkitTransform = "rotate(" + 3.6 * (n - 50) + "deg)";
    }
    $scope.radioNum = n;
  })
  .controller('StudyStateCtrl', function ($scope, $ionicModal) {
     var round = document.getElementById("study_round");
     var round2 = document.getElementById("study_round2");
     var n = 66;
     if (n <= 50) {
        round.style.webkitTransform = "rotate(" + 3.6 * n + "deg)";
        round2.style.display = "none";
     } else {
        round.style.webkitTransform = "rotate(180deg)";
        round2.style.display = "block";
        round2.style.webkitTransform = "rotate(" + 3.6 * (n - 50) + "deg)";
     }
     $scope.radioNum = n;

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.show = function(event) {

        console.log(event.currentTarget.dataset.type)
    }


  })
  .controller('ParentGuidCtrl', function ($scope, Chats) {

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
})
